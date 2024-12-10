import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewForm = () => {
  const [form, setForm] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { formId } = useParams();

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/forms/${formId}`);
        setForm(response.data.form);
        setQuestions(response.data.questions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching form:', error);
        setLoading(false);
      }
    };

    fetchForm();
  }, [formId]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!form) {
    return <div className="p-6 text-red-500">Form not found</div>;
  }

  return (
    <div className="min-h-screen bg-purple-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Form Header */}
        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
          <div className="h-2 bg-purple-600" />
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">{form.title}</h1>
            <p className="text-gray-600">{form.description}</p>
          </div>
        </div>

        {questions.map((question, index) => (
          <div key={question._id} className="bg-white rounded-lg shadow-sm mb-4 p-6">
            <div className="flex items-start mb-4">
              <span className="mr-2 text-gray-600">{index + 1}.</span>
              <div className="flex-1">
                <h2 className="text-lg font-medium mb-2">
                  {question.title}
                  {question.required && <span className="text-red-500 ml-1">*</span>}
                </h2>
                {question.type === 'multiple-choice' && (
                  <div className="space-y-2">
                    {question.options.map((option, optIndex) => (
                      <div key={optIndex} className="flex items-center">
                        <input
                          type="radio"
                          name={`question-${question._id}`}
                          className="mr-2"
                          disabled
                        />
                        <span>{option}</span>
                      </div>
                    ))}
                  </div>
                )}

                {question.type === 'checkbox' && (
                  <div className="space-y-2">
                    {question.options.map((option, optIndex) => (
                      <div key={optIndex} className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          disabled
                        />
                        <span>{option}</span>
                      </div>
                    ))}
                  </div>
                )}

                {question.type === 'short-answer' && (
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Short answer text"
                    disabled
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewForm;