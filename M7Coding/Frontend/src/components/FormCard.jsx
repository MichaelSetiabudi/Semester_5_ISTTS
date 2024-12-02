import React from "react";

const FormCard = ({ form, onDelete }) => {
  const styles = {
    formCard: {
      backgroundColor: "white",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      padding: "20px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      position: "relative",
      overflow: "hidden",
    },
    cardTopBorder: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "10px",
      backgroundColor: "#673ab7",
      borderTopLeftRadius: "8px",
      borderTopRightRadius: "8px",
    },
    cardContent: {
      marginTop: "10px",
    },
    cardTitle: {
      margin: "0 0 10px 0",
      fontSize: "16px",
      color: "#333",
    },
    cardText: {
      margin: "5px 0",
      fontSize: "14px",
      color: "#666",
    },
    buttonGroup: {
      display: "flex",
      gap: "10px",
      marginTop: "15px",
    },
    actionButton: {
      backgroundColor: "#673ab7",
      color: "white",
      border: "none",
      padding: "6px 12px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "13px",
    },
  };

  return (
    <div style={styles.formCard}>
      <div style={styles.cardTopBorder}></div>
      <div style={styles.cardContent}>
        <h3 style={styles.cardTitle}>{form.title}</h3>
        <p style={styles.cardText}>
          Created at: {new Date(form.createdAt).toLocaleDateString()}
        </p>
        <p style={styles.cardText}>Total Responses: {form.responses}</p>

        <div style={styles.buttonGroup}>
          <button style={styles.actionButton}>View</button>
          <button style={styles.actionButton}>Edit</button>
          <button
            style={styles.actionButton}
            onClick={() => onDelete(form._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormCard;
