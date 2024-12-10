const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["multiple-choice", "text", "checkbox", "short-answer"], 
    },
    options: [
      {
        type: String,
      },
    ],
    required: {
      type: Boolean,
      default: false,
    },
    shortAnswerText: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", questionSchema);
