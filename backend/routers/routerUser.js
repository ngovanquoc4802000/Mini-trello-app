import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

router.get("/all", authController.getAllUser)
router.post("/register",authController.register);
router.post("/signup",authController.login);

export default router;