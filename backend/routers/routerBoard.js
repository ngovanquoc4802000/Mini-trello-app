import express from "express";
import BoardController from "../controllers/boardController.js";
import verifyToken from "../middleWare/verifyToken.js";

const router = express.Router();

router.get("/", BoardController.getAllBoard);
router.get("/:id", verifyToken, BoardController.getIdBoard);
router.post("/", verifyToken, BoardController.createBoard);
router.put("/:id", verifyToken, BoardController.updateBoard);
router.delete("/:id", verifyToken, BoardController.deleteBoard);

export default router;
