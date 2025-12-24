const { sendMessage, getMessages } = require("../services/message.service");

const send = async (req, res, next) => {
  try {
    const senderId = req.user.id;
    const { receiverId, content } = req.body;

    const message = await sendMessage(senderId, receiverId, content);

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

const fetch = async (req, res, next) => {
  console.log("req.user:", req.user);
  console.log("req.user.id:", req.user?.id);
  console.log("req.user._id:", req.user?._id);
  console.log("req.params.userId:", req.params.userId);
  try {
    const userId = req.user.id;
    const chatWithUserId = req.params.userId;

    const messages = await getMessages(userId, chatWithUserId);

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  send,
  fetch,
};
