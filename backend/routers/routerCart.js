import express from "express";
import CartController from "../controllers/cartController.js";

const router = express.Router({mergeParams: true });
router.get("/", CartController.getCartsAll);
router.get("/:id", CartController.getCartById);
router.get("/user/:userId", CartController.getCartsByUser);
router.post("/", CartController.createCart);
router.put("/:id", CartController.updateCart);
router.delete("/:id", CartController.deleteCart);
export default router;