import express from "express";

import TasksController from "../controllers/tasksController.js";

const router = express.Router({ mergeParams: true });

router.get("/", TasksController.getTasksAll)
router.get("/:taskId", TasksController.getTasksById);
router.post("/", TasksController.createTasks);
router.put("/:taskId", TasksController.updateTaskById);
router.delete("/:taskId", TasksController.deleteTaskById);
router.post("/:taskId/assign", TasksController.assignTask);
router.get("/:taskId/assign", TasksController.getAllAssignedTasks);
router.delete("/:taskId/assign/:memberId", TasksController.removeAssignedTask);
export default router