import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ForYou({ imageUrl, title, author, totalPage, bookId, userId, onStatusChange }) {
  const [inLibrary, setInLibrary] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkLibraryStatus = async () => {
      try {
        const { data: userBooks } = await axios.get(`/api/users/${userId}/books`);
        const bookExists = userBooks.some(book => book.id === bookId);
        setInLibrary(bookExists);
      } catch (error) {
        console.error('Error checking library status:', error);
      }
    };

    if (userId) {
      checkLibraryStatus();
    }
  }, [userId, bookId]);

  const handleLibraryAction = async () => {
    if (!userId) {
      alert('Please log in to manage your library');
      return;
    }

    setIsLoading(true);
    try {
      if (inLibrary) {
        await axios.delete(`/api/users/${userId}/books/${bookId}`);
        setInLibrary(false);
        if (onStatusChange) {
          onStatusChange(false);
        }
      } else {
        // Add to library
        await axios.post(`/api/users/${userId}/books`, {
          id: bookId,
          title,
          author,
          image_url: imageUrl,
          total_pages: totalPage,
          last_pages: 0
        });

        setInLibrary(true);
        if (onStatusChange) {
          onStatusChange(true);
        }
      }
    } catch (error) {
      console.error('Error managing library:', error);
      alert('An error occurred while managing your library');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="col-6 col-md-4 col-lg-2 mb-4 d-flex"
      style={{ alignItems: "stretch", flex: "0 0 20%", marginTop: "2vh" }}
    >
      <div
        className="card text-center p-3 d-flex flex-column"
        style={{ backgroundColor: "#FFE5E5", borderRadius: "10px", flexGrow: 1 }}
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
            style={{ fontWeight: "bold", fontSize: "1.1rem", marginBottom: "0.5rem" }}
          >
            {title}
          </h5>
          <p
            className="card-text"
            style={{ marginBottom: "0.5rem", fontSize: "0.9rem", color: "#555" }}
          >
            {author}
          </p>
          <p
            className="card-text"
            style={{ fontWeight: "bold", fontSize: "0.9rem", marginBottom: "1rem" }}
          >
            {totalPage} Pages
          </p>
        </div>
        <button
          onClick={handleLibraryAction}
          disabled={isLoading}
          style={{
            backgroundColor: inLibrary ? "#FF6B6B" : "#90EE90",
            padding: "8px 16px",
            fontSize: "0.9rem",
            fontWeight: "bold",
            border: "none",
            borderRadius: "10px",
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.7 : 1,
          }}
        >
          {isLoading ? "Loading..." : inLibrary ? "DELETE FROM LIBRARY" : "ADD TO LIBRARY"}
        </button>
      </div>
    </div>
  );
}

export default ForYou;