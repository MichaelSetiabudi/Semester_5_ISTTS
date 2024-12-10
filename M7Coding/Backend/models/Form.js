const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  title: { type: String, default: "Untitled Form" },
  description: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  responses: { type: Number, default: 0 },
});

module.exports = mongoose.model("Form", formSchema);