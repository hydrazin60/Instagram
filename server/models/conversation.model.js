import mongoose from "mongoose";
const conversationsSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  {
    timestamps: true,
  }
);
conversationsSchema.index({ participants: 1 });

const Conversation = mongoose.model("Conversation", conversationsSchema);

export default Conversation;
