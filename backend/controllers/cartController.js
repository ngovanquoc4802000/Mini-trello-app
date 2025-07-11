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

const getCartById = async (req, res) => {
  try {
    const { boardsId, id } = req.params;
    const cartDoc = await firebaseStoreDB.collection("carts").doc(id).get();
    if (!cartDoc.exists)
      return res.status(404).json({ message: "Cart not found" });
    const cart = { id: cartDoc.id, ...cartDoc.data() };
    if (cart.boardsId !== boardsId) {
      return res.status(403).json({ message: "Unauthorized access to cart" });
    }
    res.status(200).json({
      message: "Cart retrieved successfully",
      description: "Retrieves details of a specific card.",
      cart: cart,
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
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
    res.status(201).json({
      success: true,
      message: "Cart created successfully",
      description: "Creates a new cart.",
      id: cartRef.id,
      ...newCart,
    });
  } catch (error) {
    console.error("Error creating cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateCart = async (req, res) => {
  try {
    const { boardsId, id } = req.params;
    const { name, description } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ error: "name and description are required" });
    }

    const cartRef = firebaseStoreDB.collection("carts").doc(id);
    const cartDoc = await cartRef.get();

    if (!cartDoc.exists) {
      return res.status(404).json({ message: "Cart not found" });
    }

    if (cartDoc.data().boardsId !== boardsId) {
      return res.status(403).json({ message: "Unauthorized access to cart" });
    }

    await cartRef.update({
      name,
      description,
      updatedAt: adminSdk.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({
      message: "Cart updated successfully",
      description: "Updates details of a specific card.",
      id: id,
      name,
      description,
    });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteCart = async (req, res) => {
  try {
    const { boardsId, id } = req.params;
    const cartRef = firebaseStoreDB.collection("carts").doc(id);
    const cartDoc = await cartRef.get();

    if (!cartDoc.exists) {
      return res.status(404).json({ message: "Cart not found" });
    }

    if (cartDoc.data().boardsId !== boardsId) {
      return res.status(403).json({ message: "Unauthorized access to cart" });
    }

    await cartRef.delete();
    res.status(200).json({
      message: "Cart deleted successfully",
      description: "Deletes a specific cart.",
      id: id,
    });
  } catch (error) {
    console.error("Error deleting cart:", error);
    res.status(500).json({ error: "Internal server error" });
  } 
};

export default {
  createCart,
  getCartsAll,
  getCartById,
  updateCart,
  deleteCart
};
