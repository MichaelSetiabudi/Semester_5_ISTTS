import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [questions, setQuestions] = useState([
    {
      title: "",
      type: "multiple-choice",
      options: ["", "", "", ""],
      required: false,
      shortAnswerText: "",
    },
  ]);

  const styles = {
    sliderContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      marginTop: "10px",
    },
    sliderLabel: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
    },
    sliderSwitch: {
      position: "relative",
      display: "inline-block",
      width: "34px",
      height: "20px",
      marginLeft: "10px",
    },
    sliderInput: {
      opacity: 0,
      width: 0,
      height: 0,
    },
    sliderTrack: {
      position: "absolute",
      cursor: "pointer",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "#ccc",
      borderRadius: "34px",
      transition: "0.4s",
    },
    sliderThumb: {
      position: "absolute",
      height: "14px",
      width: "14px",
      left: "3px",
      bottom: "3px",
      backgroundColor: "white",
      borderRadius: "50%",
      transition: "0.4s",
    },
    sliderCheckedTrack: {
      backgroundColor: "#673ab7",
    },
    sliderCheckedThumb: {
      transform: "translateX(14px)",
    },
    container: {
      padding: "20px",
      maxWidth: "800px",
      margin: "0 auto",
      backgroundColor: "#f8f0ff",
      minHeight: "100vh",
    },
    formCard: {
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "20px",
      marginBottom: "20px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      position: "relative",
      overflow: "hidden",
    },
    topBorder: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "10px",
      backgroundColor: "#673ab7",
    },
    input: {
      width: "100%",
      padding: "8px",
      marginBottom: "10px",
      border: "none",
      borderBottom: "1px solid #ddd",
      fontSize: "16px",
      outline: "none",
    },
    button: {
      backgroundColor: "#673ab7",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      marginTop: "10px",
    },
    questionCard: {
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "20px",
      marginTop: "20px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    },
    select: {
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      marginLeft: "10px",
    },
    optionInput: {
      width: "100%",
      padding: "8px",
      margin: "5px 0",
      border: "1px solid #ddd",
      borderRadius: "4px",
    },
    required: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      marginTop: "10px",
    },
    shortAnswerInput: {
      width: "100%",
      padding: "12px",
      marginTop: "10px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      backgroundColor: "#f5f5f5",
      fontSize: "14px",
    },
    addButton: {
      backgroundColor: "#673ab7",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      marginTop: "20px",
      width: "100%",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submittedFormData = {
        title: formData.title || "Untitled Form",
        description: formData.description,
      };

      const response = await axios.post(
        "http://localhost:5000/api/forms",
        submittedFormData
      );
      const formId = response.data._id;

      const preparedQuestions = questions.map((question) => ({
        ...question,
        title: question.title || "Untitled Question",
        options:
          question.type === "multiple-choice"
            ? question.options.map((opt, idx) => opt || `Option ${idx + 1}`)
            : [],
        shortAnswerText:
          question.type === "short-answer" ? question.shortAnswerText : "",
      }));

      await Promise.all(
        preparedQuestions.map((question) =>
          axios.post(
            `http://localhost:5000/api/forms/${formId}/questions`,
            question
          )
        )
      );

      navigate("/");
    } catch (error) {
      console.error("Error creating form:", error);
    }
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        title: "",
        type: "multiple-choice",
        options: ["", "", "", ""],
        required: false,
        shortAnswerText: "",
      },
    ]);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <div style={styles.topBorder}></div>
        <input
          style={styles.input}
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Untitled Form"
        />
        <input
          style={styles.input}
          type="text"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Form Description"
        />
        <button style={styles.button} onClick={handleSubmit}>
          Create Form
        </button>
      </div>

      {questions.map((question, index) => (
        <div key={index} style={styles.questionCard}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <input
              style={styles.input}
              type="text"
              value={question.title}
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[index].title = e.target.value;
                setQuestions(newQuestions);
              }}
              placeholder="Untitled Question"
            />
            <select
              style={styles.select}
              value={question.type}
              onChange={(e) => {
                const newQuestions = [...questions];
                const newType = e.target.value;
                newQuestions[index] = {
                  ...newQuestions[index],
                  type: newType,
                  options:
                    newType === "multiple-choice" ? ["", "", "", ""] : [],
                  shortAnswerText: newType === "short-answer" ? "" : "",
                };
                setQuestions(newQuestions);
              }}
            >
              <option value="multiple-choice">Multiple Choice</option>
              <option value="short-answer">Short Answer</option>
              <option value="checkbox">Checkbox</option>
            </select>
          </div>

          {question.type === "multiple-choice" &&
            question.options.map((option, optionIndex) => (
              <input
                key={optionIndex}
                style={styles.optionInput}
                type="text"
                value={option}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[index].options[optionIndex] = e.target.value;
                  setQuestions(newQuestions);
                }}
                placeholder={`Option ${optionIndex + 1}`}
              />
            ))}

          {question.type === "short-answer" && (
            <input
              type="text"
              style={styles.shortAnswerInput}
              placeholder="Short answer text"
              value={question.shortAnswerText}
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[index].shortAnswerText = e.target.value;
                setQuestions(newQuestions);
              }}
            />
          )}

          <div style={styles.sliderContainer}>
            <label style={styles.sliderLabel}>
              Required
              <span style={styles.sliderSwitch}>
                <input
                  type="checkbox"
                  checked={question.required}
                  onChange={(e) => {
                    const newQuestions = [...questions];
                    newQuestions[index].required = e.target.checked;
                    setQuestions(newQuestions);
                  }}
                  style={styles.sliderInput}
                />
                <span
                  style={{
                    ...styles.sliderTrack,
                    ...(question.required ? styles.sliderCheckedTrack : {}),
                  }}
                >
                  <span
                    style={{
                      ...styles.sliderThumb,
                      ...(question.required ? styles.sliderCheckedThumb : {}),
                    }}
                  ></span>
                </span>
              </span>
            </label>
          </div>
        </div>
      ))}

      <button style={styles.addButton} onClick={addQuestion}>
        Add question
      </button>
    </div>
  );
};

export default CreateForm;
