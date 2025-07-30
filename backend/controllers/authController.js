import bcrypt from "bcryptjs";
import { firebaseStoreDB } from "../firebaseAdmin.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { sendVerificationCode } from "./sendVerificationCodes.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await firebaseStoreDB
      .collection("users")
      .where("email", "==", email)
      .get();

    if (!existingUser.empty) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    const docRef = await firebaseStoreDB.collection("users").add(newUser);

    return res.status(201).json({
      id: docRef.id,
      email,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const userAll = await firebaseStoreDB.collection("users").get();
    if (!userAll) return console.log("No found get all user");
    const userArr = [];
    userAll.forEach((doc) => {
      userArr.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return res.status(200).json({
      success: true,
      description: "List user success",
      userAll: userArr,
    });
  } catch (error) {
    console.log("Error get all users" + error);
    throw Error(`Fails get all User ${error}`);
  }
};

const signup = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email  are required" });
  }

  try {
    const usersRef = await firebaseStoreDB
      .collection("users")
      .where("email", "==", email)
      .get();


    const newUserRef = await firebaseStoreDB.collection("users").add({
      email,
      createAt: Date.now(),
    });

    if (usersRef.empty) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const userDoc = usersRef.docs[0];

    const token = jwt.sign({ id: userDoc.id, email }, JWT_SECRET, {
      expiresIn: "1d",
    });
    await sendVerificationCode(email);

    return res.status(200).json({
      id: newUserRef.id,
      email: email,
      message: "Signup successful. Verification code send to Email !",
      accessToken: token,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Login failed", error: err.message });
  }
};

const signin = async (req, res) => {
  const { email, emailverificationCode } = req.body;

  if (!email || !emailverificationCode) {
    return res.status(400).json({
      message: "Missing email or code",
    });
  }

  try {
    const doc = await firebaseStoreDB
      .collection("emailverificationCode")
      .doc(email)
      .get();

    if (!doc.exists) {
      return res.status(400).json({
        message: "Verification code not found",
      });
    }
    const { code, exp } = doc.data();
    if (Date.now() > exp) {
      return res.status(400).json({ message: "Verification code expired" });
    }
    if (code !== emailverificationCode) {
      return res.status(400).json({ message: "Invalid verification code" });
    }
    const userSnapshot = await firebaseStoreDB
      .collection("users")
      .where("email", "==", email)
      .get();

    if (userSnapshot.empty) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = userSnapshot.docs[0].id;

    await firebaseStoreDB.collection("users").doc(userId).update({
      verified: true,
    });

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Verification failed", error: err.message });
  }
};

export default {
  register,
  signup,
  signin,
  getAllUser,
};
