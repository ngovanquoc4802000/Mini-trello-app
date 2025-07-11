import { firebaseStoreDB, adminSdk } from "../firebaseAdmin.js";

const getAllBoard = async (req, res) => {
  try {
    const boardsFiled = await firebaseStoreDB.collection("boards").get();
    if (!boardsFiled) return console.log("No found boards All");
    const boardsArr = [];
    boardsFiled.forEach((doc) => {
      boardsArr.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json({
      success: true,
      description:
        "Retrieves all boards associated with the authenticated user.",
      boards: boardsArr,
    });
  } catch (error) {
    console.log("Error get All Boards", error);
    return res.status(500).json({
      success: false,
      message: "No get all data board",
      error: error.message,
    });
  }
};

const getIdBoard = async (req, res) => {
  try {
    const boardId = req.params.id;
    if (!boardId) {
      return res.status(400).json({
        success: false,
        message: "Board ID is required",
      });
    }
    const boardDoc = await firebaseStoreDB
      .collection("boards")
      .doc(boardId)
      .get();
    if (!boardDoc) {
      console.log(`Board with ID ${boardId} not found`);
      return res.status(404).json({
        success: false,
        message: "Board not found ID",
      });
    }
    return res.status(200).json({
      success: true,
      description: "Retrieves details of a specific board.",
      board: {
        id: boardId.id,
        ...boardDoc.data(),
      },
    });
  } catch (error) {
    console.log("Error getting board by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve board by ID.",
      error: error.message,
    });
  }
};

const createBoard = async (req, res) => {
  const { name, description } = req.body;
  try {
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Board name is required",
      });
    }
    const newBoardData = {
      name: name,
      description: description || "",
      createdAt: adminSdk.firestore.FieldValue.serverTimestamp(),
    };
    console.log(newBoardData);
    const boardField = await firebaseStoreDB
      .collection("boards")
      .add(newBoardData);

    return res.status(200).json({
      success: true,
      description: "Creates a new board",
      id: boardField.id,
      ...newBoardData,
    });
  } catch (error) {
    console.log("Error create board new", error);
    res.status(500).json({
      success: false,
      message: "Error create board new",
      error: error.message,
    });
  }
};

const updateBoard = async (req, res) => {
  try {
    const boardId = req.params.id;
    const updateData = req.body;
    if (!boardId) {
      return res.status(400).json({
        success: false,
        message: "Board ID is required for update",
      });
    }
    const boardDoc = await firebaseStoreDB
      .collection("boards")
      .doc(boardId)
      .get();
    console.log(boardDoc);
    if (!boardDoc.exists) {
      return res.status(404).send({
        success: false,
        message: `Board with ID ${boardId} not found`,
      });
    }
    await firebaseStoreDB.collection("boards").doc(boardId).update(updateData);
    const updatedBoardDoc = await firebaseStoreDB
      .collection("boards")
      .doc(boardId)
      .get();
    res.status(200).json({
      success: true,
      description: "Updates details of a specific board.",
      message: `Board with ID ${boardId} update successfully`,
      board: {
        id: updatedBoardDoc.id,
        ...updatedBoardDoc.data(),
      },
    });
  } catch (error) {
    console.log("Error update board fails", error);
    return res.status(500).json({
      success: false,
      message: `Error update Id ${error}`,
    });
  }
};

const deleteBoard = async (req, res) => {
  try {
    const deleteId = req.params.id;
    const boardDoc = await firebaseStoreDB
      .collection("boards")
      .doc(deleteId)
      .delete();
    if (!boardDoc.isEqual) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete board",
      });
    }
    return res.status(200).send({
        success: true,
        description:"Deletes a specific board.",
        message: " No content in response body. Board successfully deleted.",
        board: boardDoc
    })
  } catch (error) {
    console.log("Error remove id board");
  }
};

export default {
  getAllBoard,
  createBoard,
  getIdBoard,
  updateBoard,
  deleteBoard
};
