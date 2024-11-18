import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = 'http://localhost:3001';

const ForYou = ({ imageUrl, title, author, totalPage, bookData, userId }) => {
  const [isInLibrary, setIsInLibrary] = useState(false);
  const [userBookId, setUserBookId] = useState(null);

  useEffect(() => {
    const checkIfBookInLibrary = async () => {
      if (!userId) return;

      try {
        const { data: userBooks } = await axios.get(`${API_BASE_URL}/api/users/${userId}/books`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });


        const foundBook = userBooks.find(book => 
          book.title.toLowerCase() === title.toLowerCase() && 
          book.author.toLowerCase() === author.toLowerCase()
        );

        if (foundBook) {
          setIsInLibrary(true);
          setUserBookId(foundBook.id);
        } else {
          setIsInLibrary(false);
          setUserBookId(null);
        }
      } catch (error) {
        console.error('Error checking library:', error);
        setIsInLibrary(false);
      }
    };

    checkIfBookInLibrary();
  }, [userId, title, author]);

  const handleAddToLibrary = async () => {
    if (!userId) return;

    try {
      const bookToAdd = {
        id: bookData.id,
        title: title,
        author: author,
        image_url: imageUrl,
        total_pages: totalPage,
        last_pages: 0,
        last_read: new Date().toLocaleDateString('en-GB')
      };

      const { data: newBook } = await axios.post(
        `${API_BASE_URL}/api/users/${userId}/books`,
        bookToAdd,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Book added successfully:', newBook);
      setIsInLibrary(true);
      setUserBookId(newBook.id);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleRemoveFromLibrary = async () => {
    if (!userId || !userBookId) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/users/${userId}/books/${userBookId}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      console.log('Book removed successfully');
      setIsInLibrary(false);
      setUserBookId(null);
    } catch (error) {
      console.error('Error removing book:', error);
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
          onClick={isInLibrary ? handleRemoveFromLibrary : handleAddToLibrary}
          style={{
            backgroundColor: isInLibrary ? "#FF6B6B" : "#90EE90",
            padding: "8px 16px",
            fontSize: "0.9rem",
            fontWeight: "bold",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          {isInLibrary ? "DELETE FROM LIBRARY" : "ADD TO LIBRARY"}
        </button>
      </div>
    </div>
  );
};

export default ForYou;