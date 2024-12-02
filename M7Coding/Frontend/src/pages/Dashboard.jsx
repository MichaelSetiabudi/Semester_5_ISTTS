import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormCard from "../components/FormCard";

const FormsList = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const styles = {
    container: {
      padding: "20px",
      minHeight: "100vh",
      backgroundColor: "#f8f0ff",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      fontSize: "24px",
      marginBottom: "20px",
      color: "#333",
    },
    subtitle: {
      fontSize: "20px",
      margin: "30px 0 20px",
      color: "#333",
    },
    newFormButton: {
      backgroundColor: "#673ab7",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
    },
    formsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "20px",
      marginTop: "20px",
    },
    noForms: {
      color: "#666",
      fontStyle: "italic",
      marginTop: "20px",
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/forms")
      .then((response) => {
        setForms(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching forms:", error);
        setError("Failed to fetch forms. Please try again later.");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/forms/${id}`)
      .then(() => {
        setForms(forms.filter((form) => form._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting form:", error);
      });
  };

  if (loading) {
    return <div style={{ padding: "20px" }}>Loading forms...</div>;
  }

  if (error) {
    return <div style={{ padding: "20px", color: "red" }}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome!</h1>
      <button
        style={styles.newFormButton}
        onClick={() => navigate("/newForm")}
      >
        Start a new form
      </button>

      <h2 style={styles.subtitle}>Recent forms</h2>

      {forms.length === 0 ? (
        <p style={styles.noForms}>No forms available. Start creating one!</p>
      ) : (
        <div style={styles.formsGrid}>
          {forms.map((form) => (
            <FormCard
              key={form._id}
              form={form}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FormsList;
