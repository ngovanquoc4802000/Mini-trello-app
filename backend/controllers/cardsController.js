import { firebaseStoreDB, adminSdk } from "../firebaseAdmin.js";

const getCardsAll = async (req, res) => {
  try {
    const { boardsId } = req.params;

    const boardDoc = await firebaseStoreDB.collection("boards").doc(boardsId).get();

    if (!boardDoc.exists) {
      return res.status(404).json({ message: "Board not found" });
    }

    const boardData = boardDoc.data();

    const cardsSnapshot = await firebaseStoreDB
      .collection("cards")
      .where("boardsId", "==", boardsId)
      .get();

    const cards = cardsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json({
      success: true,
      message: "Cards retrieved successfully",
      description: "Retrieves all cards associated with the board.",
      board: {
        id: boardsId,
        name: boardData.name,         
        description: boardData.description || "",
      },
      cards: cards,
    });
  } catch (error) {
    console.error("Error fetching cards:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


const getCardsById = async (req, res) => {
  try {
    const { boardsId, id } = req.params;

    const cardsDoc = await firebaseStoreDB.collection("cards").doc(id).get();

    if (!cardsDoc.exists)
      return res.status(404).json({ message: "Cards not found" });

    const cards = { id: cardsDoc.id, ...cardsDoc.data() };

    if (cards.boardsId !== boardsId) {
      return res.status(403).json({ message: "Unauthorized access to cards" });
    }

    res.status(200).json({
      message: "cards retrieved successfully",
      description: "Retrieves details of a specific card.",
      cards: cards,
    });
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createCards = async (req, res) => {
  try {
    const { boardsId } = req.params;
    const { name, description } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ error: "name and description are required" });
    }

    const newCards = {
      boardsId,
      name,
      description,
      createdAt: adminSdk.firestore.FieldValue.serverTimestamp(),
    };

    const cardsRef = await firebaseStoreDB.collection("cards").add(newCards);
    res.status(201).json({
      success: true,
      message: "cards created successfully",
      description: "Creates a new cards.",
      id: cardsRef.id,
      ...newCards,
    });
  } catch (error) {
    console.error("Error creating cards:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateCards = async (req, res) => {
  try {
    const { boardsId, id } = req.params;
    const { name, description } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ error: "name and description are required" });
    }

    const cardsRef = firebaseStoreDB.collection("cards").doc(id);
    const cardsDoc = await cardsRef.get();

    if (!cardsDoc.exists) {
      return res.status(404).json({ message: "cards not found" });
    }

    if (cardsDoc.data().boardsId !== boardsId) {
      return res.status(403).json({ message: "Unauthorized access to cards" });
    }

    await cardsRef.update({
      name,
      description,
      updatedAt: adminSdk.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({
      message: "cards updated successfully",
      description: "Updates details of a specific card.",
      id: id,
      name,
      description,
    });
  } catch (error) {
    console.error("Error updating cards:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCardsByUser = async (req, res) => {
  try {
    const { userId, boardsId } = req.params;
    const cardsSnapshot = await firebaseStoreDB
      .collection("cards")
      .where("userId", "==", userId)
      .where("boardsId", "==", boardsId)
      .get();
    if (cardsSnapshot.empty) {
      return res.status(404).json({ message: "No cards found for this user." });
    }
    const cards = cardsSnapshot.docs.map((doc) => ({
      id: doc.id,
      boardsId: doc.data().boardsId,
      userId: doc.data().userId,
      name: doc.data().name,
      description: doc.data().description,
      tasks_count: doc.data().tasks_count || 0,
      list_member: doc.data().list_member || [],
      createdAt:
        doc.data().createdAt || adminSdk.firestore.FieldValue.serverTimestamp(),
      ...doc.data(),
    }));
    res.status(200).json({
      message: "cards retrieved successfully",
      description: "Retrieves cards associated with a specific user.",
      cards: cards,
    });
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteCards = async (req, res) => {
  try {
    const { boardsId, id } = req.params;
    const cardsRef = firebaseStoreDB.collection("cards").doc(id);
    const cardsDoc = await cardsRef.get();

    if (!cardsDoc.exists) {
      return res.status(404).json({ message: "cards not found" });
    }

    if (cardsDoc.data().boardsId !== boardsId) {
      return res.status(403).json({ message: "Unauthorized access to cards" });
    }

    await cardsRef.delete();
    res.status(200).json({
      message: "cards deleted successfully",
      description: "Deletes a specific cards.",
      id: id,
    });
  } catch (error) {
    console.error("Error deleting cards:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  createCards,
  getCardsAll,
  getCardsById,
  updateCards,
  deleteCards,
  getCardsByUser,
};
