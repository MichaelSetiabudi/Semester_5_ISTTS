const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: "Form" },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  answer: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Response", responseSchema);