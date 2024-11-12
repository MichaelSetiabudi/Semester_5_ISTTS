import React, { useState, useEffect } from "react";

const ForYou = ({ imageUrl, title, author, totalPage, bookData ,userId}) => {
  const [isInLibrary, setIsInLibrary] = useState(false);
  const [userBookId, setUserBookId] = useState(null);

  useEffect(() => {
    const checkIfBookInLibrary = async () => {

      try {
        const response = await fetch(`/api/users/${userId}/books`);
        const userBooks = await response.json();
        
        const foundBook = userBooks.find(book => 
          book.title.toLowerCase() === title.toLowerCase() && 
          book.author.toLowerCase() === author.toLowerCase()
        );
        
        console.log('Found Book:', foundBook);
        
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
  }, [userId, title, author]); // Mengubah dependencies

  const handleAddToLibrary = async () => {
    console.log('Adding book to library...');
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

      console.log('Sending book data:', bookToAdd);

      const response = await fetch(`/api/users/${userId}/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookToAdd),
      });

      if (response.ok) {
        const newBook = await response.json();
        console.log('Book added successfully:', newBook);
        setIsInLibrary(true);
        setUserBookId(newBook.id);
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleRemoveFromLibrary = async () => {
    console.log('Removing book from library...');
    try {
      const response = await fetch(`/api/users/${userId}/books/${userBookId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Book removed successfully');
        setIsInLibrary(false);
        setUserBookId(null);
      }
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