/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

function ListUser({ username, email, join_at, onDelete }) {
  const userCardStyle = {
    backgroundColor: "#f8d7da",
    padding: "1rem",
    borderRadius: "8px",
    margin: "0.5rem 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const userInfoStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const deleteButtonStyle = {
    backgroundColor: "#ff6b6b",
    border: "none",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div style={userCardStyle}>
      <div style={userInfoStyle}>
        <strong>{username}</strong>
        <span>{email}</span>
      </div>
      <div>
        <span style={{ marginRight: "2vw" }}>Join at {join_at}</span>
        <button style={deleteButtonStyle} onClick={onDelete}>DELETE</button>
      </div>
    </div>
  );
}

export default ListUser;