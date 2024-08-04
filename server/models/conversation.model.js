// import mongoose from "mongoose";
// const conversationsSchema = new mongoose.Schema({
//   participants: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   ],
//   messages: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Message",
//     },
//   ],
// });
// const Conversation = mongoose.model("Conversation", conversationsSchema);
// export default Conversation;

import mongoose from "mongoose";

const conversationsSchema = new mongoose.Schema({
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
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Optional: Add index for participants to improve query performance
conversationsSchema.index({ participants: 1 });

const Conversation = mongoose.model("Conversation", conversationsSchema);

export default Conversation;
