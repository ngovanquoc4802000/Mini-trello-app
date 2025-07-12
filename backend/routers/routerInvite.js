import express from "express";
import InviteController from "../controllers/inviteController.js";

const router = express.Router({ mergeParams: true });

router.post("/:boardId/invite", InviteController.createInvite);
router.post("/:boardId/cards/:cardId/invite/accept", InviteController.acceptInvite);

export default router;
