// import mongoose from "mongoose";

// const messageSchema = new mongoose.Schema({
//   senderId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
//   receiverId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
//   message: {
//     type: String,
//     required: true,
//   },
// });
// export default Message = mongoose.model("Message", messageSchema);

 

import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: { // Updated from `messages` to `message`
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.index({ senderId: 1 });
messageSchema.index({ receiverId: 1 });

const Message = mongoose.model("Message", messageSchema);

export default Message;
