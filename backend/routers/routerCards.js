import express from "express";
import CardsController from "../controllers/cardsController.js";

const router = express.Router({mergeParams: true });
router.get("/", CardsController.getCardsAll);
router.get("/:id", CardsController.getCardsById);
router.get("/user/:userId", CardsController.getCardsByUser);
router.post("/", CardsController.createCards);
router.put("/:id", CardsController.updateCards);
router.delete("/:id", CardsController.deleteCards);
export default router;