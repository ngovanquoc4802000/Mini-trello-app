import { FieldValue } from "firebase-admin/firestore";
import { adminSdk, firebaseStoreDB } from "../firebaseAdmin.js";
const createInvite = async (req, res) => {
  const { boardId } = req.params;

  const {
    email_member,
    board_owner_id,
    invite_id,
    member_id,
    status = "pending",
  } = req.body;

  try {
    if (!email_member || !board_owner_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await firebaseStoreDB.collection("invites").add({
      board_id: boardId,
      invite_id,
      board_owner_id,
      member_id,
      email_member,
      status,
      createdAt: FieldValue.serverTimestamp(),
    });

    res.status(201).json({
      success: true,
      message: "Invite created successfully",
      description: "Creates a new invite for a member to join a board.",
      invite_id,
      board_owner_id,
      member_id,
      email_member,
      status,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create invite" });
  }
};

const acceptInvite = async (req, res) => {
  const { boardId, cardId } = req.params;
  const { userId } = req.body;

  try {
    const inviteSnapshot = await firebaseStoreDB
      .collection("invites")
      .where("user_id", "==", userId)
      .where("member_id", "==", userId)
      .where("board_id", "==", boardId)
      .limit(1)
      .get();

    if (inviteSnapshot.empty) {
      return res.status(404).json({ error: "Invite not found" });
    }

    const inviteDoc = inviteSnapshot.docs[0];
    await inviteDoc.ref.update({
      message: "Invite accepted",
      status: "accepted",
      responseAt: FieldValue.serverTimestamp(),
    });
    if (cardId) {
      await firebaseStoreDB
        .collection("carts")
        .doc(cardId)
        .update({
          list_member: adminSdk.firestore.FieldValue.arrayUnion(userId),
        });
    }

    res.status(200).json({
      success: true,
      message: `Invite accepted for card ${cardId} on board ${boardId} by user ${userId}`,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to accept invite" });
  }
};

export default {
  createInvite,
  acceptInvite,
};
