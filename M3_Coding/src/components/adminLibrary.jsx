import React from "react";

function AdminLibrary({ imageUrl, title, author, totalPage }) {
  return (
    <div
      className="col-6 col-md-4 col-lg-2 mb-4" 
      style={{ paddingLeft: "0", paddingRight: "2vw" }}
    >
      <div
        className="card text-center"
        style={{
          backgroundColor: "#FFE5E5",
          borderRadius: "10px",
          padding: "15px", 
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <img
          src={imageUrl}
          alt={title}
          style={{
            width: "80%",
            height: "160px",
            objectFit: "contain",
            margin: "0 auto",
            borderRadius: "5px",
          }}
        />
        <div className="card-body">
          <h5
            className="card-title"
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem", // Increased font size for the title
              marginBottom: "0.5rem",
            }}
          >
            {title}
          </h5>
          <p
            className="card-text"
            style={{
              fontSize: "1rem", // Increased font size for the author
              color: "#555",
              marginBottom: "0.5rem",
            }}
          >
            {author}
          </p>
          <p
            className="card-text"
            style={{
              fontWeight: "bold",
              fontSize: "1rem", // Increased font size for the total pages
              marginBottom: "1rem",
            }}
          >
            {totalPage} Pages
          </p>
          <button
            className="bg-danger"
            style={{
              padding: "10px 20px", 
              fontSize: "0.9rem", 
              fontWeight: "bold",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              color: "white",
            }}
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLibrary;
