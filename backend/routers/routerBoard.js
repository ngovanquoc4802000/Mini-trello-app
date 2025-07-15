import express from "express";
import BoardController from "../controllers/boardController.js";

const router = express.Router();

router.get("/",BoardController.getAllBoard);
router.get("/:id",BoardController.getIdBoard);
router.post("/", BoardController.createBoard);
router.put("/:id",BoardController.updateBoard)
router.delete("/:id",BoardController.deleteBoard)

export default router;