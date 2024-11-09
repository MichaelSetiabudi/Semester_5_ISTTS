/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";

function ForYou({
  imageUrl,
  title,
  author,
  totalPage,
  user_id,
  usersBook,
  setUsersBook,
}) {
  const userBooks = usersBook[user_id] || [];
  
  const isBookInLibrary = userBooks.some(book => book.title === title);

  const handleLibraryAction = () => {
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
    
    if (isBookInLibrary) {
      const updatedBooks = userBooks.filter(book => book.title !== title);
      setUsersBook(prevBooks => ({ ...prevBooks, [user_id]: updatedBooks }));
    } else {
      const newId = userBooks.length ? userBooks[userBooks.length - 1].id + 1 : 1;
      const newBook = {
        id: newId,
        title,
        author,
        image_url: imageUrl,
        last_pages: 0,
        total_pages: totalPage,
        last_read: formattedDate,
      };

      setUsersBook(prevBooks => ({
        ...prevBooks,
        [user_id]: [...userBooks, newBook],
      }));
    }
  };

  return (
    <div
      className="col-6 col-md-4 col-lg-2 mb-4 d-flex"
      style={{ alignItems: "stretch", flex: "0 0 20%", marginTop: "2vh" }}
    >
      <div
        className="card text-center p-3 d-flex flex-column"
        style={{
          backgroundColor: "#FFE5E5",
          borderRadius: "10px",
          flexGrow: 1,
        }}
      >
        <img
          src={imageUrl}
          alt={title}
          style={{
            width: "60%",
            height: "120px",
            objectFit: "contain",
            margin: "0 auto",
            borderRadius: "5px",
          }}
        />
        <div className="card-body d-flex flex-column" style={{ flexGrow: 1 }}>
          <h5
            className="card-title"
            style={{
              fontWeight: "bold",
              fontSize: "1.1rem",
              marginBottom: "0.5rem",
            }}
          >
            {title}
          </h5>
          <p
            className="card-text"
            style={{
              marginBottom: "0.5rem",
              fontSize: "0.9rem",
              color: "#555",
            }}
          >
            {author}
          </p>
          <p
            className="card-text"
            style={{
              fontWeight: "bold",
              fontSize: "0.9rem",
              marginBottom: "1rem",
            }}
          >
            {totalPage} Pages
          </p>
        </div>
        <button
          onClick={handleLibraryAction}
          style={{
            backgroundColor: isBookInLibrary ? "#FF7F7F" : "#90EE90",
            padding: "8px 16px",
            fontSize: "0.9rem",
            fontWeight: "bold",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          {isBookInLibrary ? "REMOVE FROM LIBRARY" : "ADD TO LIBRARY"}
        </button>
      </div>
    </div>
  );
}

export default ForYou;
