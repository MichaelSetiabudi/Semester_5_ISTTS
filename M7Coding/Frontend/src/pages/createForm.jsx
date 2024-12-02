import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: 'Untitled Form',
    description: '',
  });
  const [questions, setQuestions] = useState([{
    title: 'Untitled Question',
    type: 'multiple-choice',
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    required: false
  }]);

  const styles = {
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
      overflow: "hidden"
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
      outline: "none"
    },
    button: {
      backgroundColor: "#673ab7",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      marginTop: "10px"
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
      marginLeft: "10px"
    },
    optionInput: {
      width: "100%",
      padding: "8px",
      margin: "5px 0",
      border: "1px solid #ddd",
      borderRadius: "4px"
    },
    required: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      marginTop: "10px"
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/forms', formData);
      const formId = response.data._id;
      
      // Create questions
      await Promise.all(questions.map(question =>
        axios.post(`http://localhost:5000/api/forms/${formId}/questions`, question)
      ));
      
      navigate('/'); // Go back to forms list
    } catch (error) {
      console.error('Error creating form:', error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <div style={styles.topBorder}></div>
        <input
          style={styles.input}
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          placeholder="Untitled Form"
        />
        <input
          style={styles.input}
          type="text"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          placeholder="Form Description"
        />
        <button style={styles.button} onClick={handleSubmit}>
          Create Form
        </button>
      </div>

      {questions.map((question, index) => (
        <div key={index} style={styles.questionCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                newQuestions[index].type = e.target.value;
                setQuestions(newQuestions);
              }}
            >
              <option value="multiple-choice">Multiple Choice</option>
              <option value="text">Text</option>
              <option value="checkbox">Checkbox</option>
            </select>
          </div>

          {question.type === 'multiple-choice' && question.options.map((option, optionIndex) => (
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

          <div style={styles.required}>
            <label>
              Required
              <input
                type="checkbox"
                checked={question.required}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[index].required = e.target.checked;
                  setQuestions(newQuestions);
                }}
                style={{ marginLeft: "8px" }}
              />
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CreateForm;