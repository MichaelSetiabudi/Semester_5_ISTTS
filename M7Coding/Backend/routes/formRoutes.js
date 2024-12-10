const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Form = require("../models/Form");
const Question = require("../models/Question");
const Response = require("../models/Response");

router.get("/", async (req, res) => {
  const forms = await Form.find().sort({ createdAt: -1 });
  res.json(forms);
});

router.post("/", async (req, res) => {
  const newForm = new Form(req.body);
  await newForm.save();
  res.json(newForm);
});

router.get("/:formId", async (req, res) => {
  const form = await Form.findById(req.params.formId);
  const questions = await Question.find({ formId: req.params.formId });
  res.json({ form, questions });
});

router.post("/:formId/questions", async (req, res) => {
  const question = new Question({
    formId: req.params.formId,
    ...req.body,
  });
  await question.save();
  res.json(question);
});

router.post("/:formId/submit", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { responses } = req.body;

    const questions = await Question.find({ formId: req.params.formId });
    const requiredQuestions = questions.filter((q) => q.required);

    for (const question of requiredQuestions) {
      if (!responses.find((r) => r.questionId === question.id)) {
        throw new Error(`Question "${question.title}" is required`);
      }
    }

    await Promise.all(
      responses.map(async (response) => {
        const newResponse = new Response({
          formId: req.params.formId,
          questionId: response.questionId,
          answer: response.answer,
        });
        await newResponse.save({ session });
      })
    );

    await Form.findByIdAndUpdate(
      req.params.formId,
      { $inc: { responses: 1 } },
      { session }
    );

    await session.commitTransaction();
    res.json({ message: "Form submitted successfully" });
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ error: error.message });
  } finally {
    session.endSession();
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const form = await Form.findById(id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    await Question.deleteMany({ formId: id });
    await Response.deleteMany({ formId: id });
    await Form.deleteOne({ _id: id });

    return res.status(200).json({
      message: "Form and related data deleted successfully",
      deletedForm: form,
    });
  } catch (error) {
    console.error("Delete error:", error); 
    return res.status(500).json({
      message: "Error deleting form",
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    // const form = await Form.findById(req.params.formId);
    // if (!form) {
    //   return res.status(404).json({ message: "Form not found" });
    // }
    
    // const questions = await Question.find({ formId: req.params.formId });
    // res.json({ form, questions });
  } catch (error) {
    console.error("Error fetching form:", error);
    res.status(500).json({ message: "Error fetching form details" });
  }
});

module.exports = router;
