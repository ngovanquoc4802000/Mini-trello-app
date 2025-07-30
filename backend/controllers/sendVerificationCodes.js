import { transporter } from "./authController.js";
import { firebaseStoreDB } from "../firebaseAdmin.js";

export const sendVerificationCode = async(email) => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    const expiresIn = Date.now() + 10 * 60 * 1000; // 10p

    await transporter.sendMail({
        from: `verify app <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your Verification Code",
        text: `Your verification code is ${code}
        `
    })

    /* store firebase nhe */
    await firebaseStoreDB.collection("emailverificationCode").doc(email).set({
        email,
        code,
        exp: expiresIn,
        created: Date.now(),
    })
}