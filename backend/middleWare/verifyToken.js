

import { auth } from "../firebaseAdmin.js";
const JWT_SECRET = process.env.JWT_SECRET;
const verifyToken = async (req,res,next) => {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    const decoded = await auth.verifyIdToken(token,JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized" });
  }
}
export default verifyToken;