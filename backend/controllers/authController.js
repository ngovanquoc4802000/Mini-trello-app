import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { firebaseStoreDB } from "../firebaseAdmin.js";

const JWT_SECRET = process.env.JWT_SECRET;

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

const getAllUser = async(req,res) => {
  try {
    const userAll = await firebaseStoreDB.collection("users").get();
    if(!userAll) return console.log("No found get all user");
    const userArr = [];
    userAll.forEach((doc) => {
      userArr.push({
        id: doc.id, ...doc.data()
      })
    })
  return res.status(200).json({
    success:true,
    description: "List user success",
    userAll: userArr
   })
  } catch(error) {
     console.log("Error get all users" + error);
     throw Error (`Fails get all User ${error}`)
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const usersRef = await firebaseStoreDB
      .collection("users")
      .where("email", "==", email)
      .get();

    if (usersRef.empty) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const userDoc = usersRef.docs[0];
    const userData = userDoc.data();

    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: userDoc.id, email }, JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      email: email,
      accessToken: token,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Login failed", error: err.message });
  }
};

export default {
  register,
  login,
  getAllUser
};
