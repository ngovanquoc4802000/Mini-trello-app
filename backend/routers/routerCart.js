import express from "express";
import CartController from "../controllers/cartController.js";

const router = express.Router({mergeParams: true });
router.post("/", CartController.createCart);
router.get("/", CartController.getCartsAll);

export default router;