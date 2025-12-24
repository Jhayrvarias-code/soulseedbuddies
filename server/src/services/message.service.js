const mongoose = require("mongoose");
const Message = require("../models/message.model");
const Match = require("../models/match.model");

const sendMessage = async (senderId, receiverId, content) => {
  const senderObjId = new mongoose.Types.ObjectId(senderId);
  const receiverObjId = new mongoose.Types.ObjectId(receiverId);

  const match = await Match.findOne({
    users: { $all: [senderObjId, receiverObjId] },
    unmatched: false,
  });

  if (!match) {
    throw new Error("You can only message matched users");
  }

  return await Message.create({
    sender: senderObjId,
    receiver: receiverObjId,
    content: content.trim(),
  });
};

const getMessages = async (userId, chatWithUserId) => {
  const userObjId = new mongoose.Types.ObjectId(userId);
  const chatWithObjId = new mongoose.Types.ObjectId(chatWithUserId);

  return await Message.find({
    $or: [
      { sender: userObjId, receiver: chatWithObjId },
      { sender: chatWithObjId, receiver: userObjId },
    ],
  }).sort({ createdAt: 1 });
};

module.exports = {
  sendMessage,
  getMessages,
};
