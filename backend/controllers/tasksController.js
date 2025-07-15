import { firebaseStoreDB, adminSdk } from "../firebaseAdmin.js";

const getTasksAll = async (req, res) => {
  try {
    const { boardId, id: cardId } = req.params;
    if (!boardId || !cardId) {
      return res.status(400).json({
        success: false,
        message: "Board ID and Card ID are required",
      });
    }

    const tasksSnapshot = await firebaseStoreDB
      .collection("tasks")
      .where("boardId", "==", boardId)
      .where("cardId", "==", cardId)
      .get();

    const tasks = tasksSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({
      success: true,
      message: "Tasks retrieved successfully",
      description: "Retrieves all tasks for a specific card.",
      tasks,
    });
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const getTasksById = async (req, res) => {
  try {
    const { boardId, id: cardId, taskId } = req.params;

    if (!boardId || !cardId || !taskId) {
      return res.status(400).json({
        success: false,
        message: "Board ID, Card ID, and Task ID are required",
      });
    }

    const taskSnapshot = await firebaseStoreDB
      .collection("tasks")
      .doc(taskId)
      .get();

    if (!taskSnapshot.exists) {
      return res.status(404).json({
        success: false,
        message: "Task ID not found",
      });
    }

    const task = { id: taskSnapshot.id, ...taskSnapshot.data() };

    res.status(200).json({
      success: true,
      message: "Task retrieved successfully",
      description: "Retrieves a specific task by its ID.",
      task,
    });
  } catch (error) {
    console.error("Error retrieving task:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const updateTaskById = async (req, res) => {
  try {
    const { boardId, id: cardId, taskId } = req.params;

    if (!boardId || !cardId || !taskId) {
      return res.status(400).json({
        success: false,
        message: "Board ID, Card ID, and Task ID are required",
      });
    }

    const { title, description, status = "đang thực hiện" } = req.body;

    const taskRef = firebaseStoreDB.collection("tasks").doc(taskId);
    const taskSnapshot = await taskRef.get();

    if (!taskSnapshot.exists) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    await taskRef.update({
      title,
      description,
      status,
      updatedAt: adminSdk.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      description: "Updates a specific task by its ID.",
      task: { id: taskSnapshot.id, ...taskSnapshot.data() },
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const createTasks = async (req, res) => {
  try {
    const { boardId, id: cardId } = req.params;

    if (!boardId || !cardId) {
      return res.status(400).json({
        success: false,
        message: "Board ID and Card ID are required",
      });
    }

    const { title, description, status = "Đang thực hiện" } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const newTask = {
      cardId,
      boardId,
      title,
      description,
      status,
      createdAt: adminSdk.firestore.FieldValue.serverTimestamp(),
      updatedAt: adminSdk.firestore.FieldValue.serverTimestamp(),
    };

    const taskRef = await firebaseStoreDB.collection("tasks").add(newTask);

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      description: "Creates a new task within a card.",
      task: { id: taskRef.id, ...newTask },
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const deleteTaskById = async (req, res) => {
  try {
    const { boardId, id: cardId, taskId } = req.params;

    if (!boardId || !cardId || !taskId) {
      return res.status(400).json({
        success: false,
        message: "Board ID, Card ID, and Task ID are required",
      });
    }

    const taskRef = firebaseStoreDB.collection("tasks").doc(taskId);
    const taskSnapshot = await taskRef.get();

    if (!taskSnapshot.exists) {
      return res.status(404).json({
        success: false,
        message: "Task delete not found",
      });
    }

    await taskRef.delete();

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      description: "Deletes a specific task by its ID.",
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const assignTask = async (req, res) => {
  try {
    const { boardId, id: cardId, taskId } = req.params;

    const { memberId } = req.body;

    if (!boardId || !cardId || !taskId || !memberId) {
      return res.status(400).json({
        success: false,
        message: "Board ID, Card ID, Task ID, and Member ID are required",
      });
    }

    const taskRef = firebaseStoreDB.collection("tasks").doc(taskId);
    
    const taskSnapshot = await taskRef.get();

    if (!taskSnapshot.exists) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await taskRef.update({
      assignedTo: memberId,
      updatedAt: adminSdk.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({
      success: true,
      message: "Task assigned successfully",
      description: "Assigns a task to a specific member.",
      task: { id: taskSnapshot.id, ...taskSnapshot.data() },
    });
  } catch (error) {
    console.error("Error assigning task:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const getAllAssignedTasks = async (req, res) => {
  try {
    const { memberId } = req.params;
    if (!memberId) {
      return res.status(400).json({
        success: false,
        message: "Member ID is required",
      });
    }

    const tasksSnapshot = await firebaseStoreDB
      .collection("tasks")
      .where("assignedTo", "==", memberId)
      .get();

    const tasks = tasksSnapshot.docs.map((doc) => ({
      taskId: doc.id,
      memberId: doc.data().assignedTo || undefined,
    }));

    res.status(200).json({
      success: true,
      message: "Assigned tasks retrieved successfully",
      description: "Retrieves all tasks assigned to a specific member.",
      tasks,
    });
  } catch (error) {
    console.error("Error retrieving assigned tasks:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const removeAssignedTask = async (req, res) => {
  try {
    const { boardId, id: cardId, taskId, memberId } = req.params;
    if (!boardId || !cardId || !taskId || !memberId) {
      return res.status(400).json({
        success: false,
        message: "Board ID, Card ID, Task ID, and Member ID are required",
      });
    }
    const taskRef = firebaseStoreDB.collection("tasks").doc(taskId);
    const taskSnapshot = await taskRef.get();

    if (!taskSnapshot.exists) {
      return res.status(404).json({
        success: false,
        message: "Task delete not found",
      });
    }
    await taskRef.update({
      assignedTo: adminSdk.firestore.FieldValue.delete(),
      updatedAt: adminSdk.firestore.FieldValue.serverTimestamp(),
    });
    res.status(200).json({
      success: true,
      message: "Assigned task removed successfully",
      description: "Removes a member from the assigned tasks.",
    });
  } catch (error) {
    console.error("Error removing assigned task:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export default {
  getTasksAll,
  getTasksById,
  updateTaskById,
  createTasks,
  deleteTaskById,
  assignTask,
  getAllAssignedTasks,
  removeAssignedTask
};
