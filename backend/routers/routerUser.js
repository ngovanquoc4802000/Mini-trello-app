import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router({ mergeParams: true });


router.get("/all", authController.getAllUser)
router.post("/register",authController.register);
router.post("/signup",authController.signup);
router.post("/signin",authController.signin)

export default router;