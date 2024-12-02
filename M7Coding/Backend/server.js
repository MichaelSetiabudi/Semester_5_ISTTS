const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/forms", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Schemas and Models
const formSchema = new mongoose.Schema({
  title: { type: String, default: "Untitled Form" },
  description: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  responses: { type: Number, default: 0 },
});

const questionSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form' },
  title: { type: String, default: "Untitled Question" },
  type: { 
    type: String, 
    enum: ['multiple-choice', 'checkbox', 'text'],
    default: "multiple-choice" 
  },
  options: [String],
  required: { type: Boolean, default: false }
});

const responseSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form' },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
  answer: {
    type: mongoose.Schema.Types.Mixed, // Can store string for text, string for multiple-choice, or array of strings for checkbox
    required: true
  },
  submittedAt: { type: Date, default: Date.now }
});

const Form = mongoose.model("Form", formSchema);
const Question = mongoose.model("Question", questionSchema);
const Response = mongoose.model("Response", responseSchema);

// Routes
app.get("/api/forms", async (req, res) => {
  const forms = await Form.find().sort({ createdAt: -1 });
  res.json(forms);
});

app.post("/api/forms", async (req, res) => {
  const newForm = new Form(req.body);
  await newForm.save();
  res.json(newForm);
});

app.get("/api/forms/:formId", async (req, res) => {
  const form = await Form.findById(req.params.formId);
  const questions = await Question.find({ formId: req.params.formId });
  res.json({ form, questions });
});

app.post("/api/forms/:formId/questions", async (req, res) => {
  const question = new Question({
    formId: req.params.formId,
    ...req.body
  });
  await question.save();
  res.json(question);
});

// New route for submitting form responses
app.post("/api/forms/:formId/submit", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { responses } = req.body;
    
    // Validate all required questions are answered
    const questions = await Question.find({ formId: req.params.formId });
    const requiredQuestions = questions.filter(q => q.required);
    
    for (const question of requiredQuestions) {
      if (!responses.find(r => r.questionId === question.id)) {
        throw new Error(`Question "${question.title}" is required`);
      }
    }

    // Save all responses
    await Promise.all(responses.map(async response => {
      const newResponse = new Response({
        formId: req.params.formId,
        questionId: response.questionId,
        answer: response.answer
      });
      await newResponse.save({ session });
    }));

    // Increment response count
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

app.delete("/api/forms/:id", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await Question.deleteMany({ formId: req.params.id }, { session });
    await Response.deleteMany({ formId: req.params.id }, { session });
    await Form.findByIdAndDelete(req.params.id, { session });
    
    await session.commitTransaction();
    res.json({ message: "Form and all related data deleted" });
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ error: error.message });
  } finally {
    session.endSession();
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));