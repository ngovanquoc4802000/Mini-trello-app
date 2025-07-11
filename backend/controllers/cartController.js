import { firebaseStoreDB, adminSdk } from "../firebaseAdmin.js";

const getCartsAll = async (req, res) => {
  try {
    const { boardsId } = req.params;
    const cartsSnapshot = await firebaseStoreDB
      .collection("carts")
      .where("boardsId", "==", boardsId)
      .get();

    if (cartsSnapshot.empty) {
      return res
        .status(404)
        .json({ message: "No carts found for this board." });
    }

    const carts = cartsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json({
      message: "Carts retrieved successfully",
      description:
        "Retrieves all carts associated with the authenticated user.",
      carts: carts,
    });
  } catch (error) {
    console.error("Error fetching carts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createCart = async (req, res) => {
  try {
    const { boardsId } = req.params;
    const { name, description } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ error: "name and description are required" });
    }

    const newCart = {
      boardsId,
      name,
      description,
      createdAt: adminSdk.firestore.FieldValue.serverTimestamp(),
    };

    const cartRef = await firebaseStoreDB.collection("carts").add(newCart);
    res.status(201).json({ id: cartRef.id, ...newCart });
  } catch (error) {
    console.error("Error creating cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export default {
  createCart,
  getCartsAll,
};
