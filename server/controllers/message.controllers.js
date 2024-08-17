import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message content is required",
        error: true,
      });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    conversation.messages.push(newMessage._id);
    await conversation.save();

    return res.status(200).json({
      message: "Message sent successfully",
      success: true,
      data: newMessage,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: `"Internal server error" ${error.message}`,
      error: true,
    });
  }
};

export const getMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(404).json({
        messages: [],
        error: true,
      });
    }

    return res.status(200).json({
      messages: conversation.messages,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: `"Internal server error" ${error.message}`,
      error: true,
    });
  }
};
