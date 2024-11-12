/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

function Library({
  imageUrl,
  title,
  author,
  lastRead,
  lastPage,
  totalPage,
  bookId,
  userId,
  onUpdateBook
}) {
  const [editableLastPage, setEditableLastPage] = useState(lastPage);
  const [isUpdating, setIsUpdating] = useState(false);
  const [bookData, setBookData] = useState(null);
  const progress = totalPage > 0 ? (editableLastPage / totalPage) * 100 : 0;
  const isFinished = editableLastPage >= totalPage;

  useEffect(() => {
    const fetchBookData = async () => {
      if (!userId || !bookId) return;
      
      try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}/books/${bookId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch book data');
        }
        const data = await response.json();
        if (data && data.last_pages !== undefined) {
          setEditableLastPage(data.last_pages);
          setBookData(data);
          if (onUpdateBook) {
            onUpdateBook(data);
          }
        }
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchBookData();
  }, [userId, bookId]); // Re-fetch when userId or bookId changes

  // Validate required props
  if (!userId || !bookId) {
    console.error('Missing required props: userId or bookId');
    return null;
  }

  const handleLastPageChange = async (e) => {
    if (isUpdating) return;

    let value = e.target.value.replace(/\D/g, "");
    value = Math.max(0, Math.min(totalPage, Number(value)));
    setEditableLastPage(value);

    try {
      setIsUpdating(true);
      const response = await fetch(`http://localhost:3000/api/users/${userId}/books/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          last_pages: value
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update book progress');
      }

      const updatedBook = await response.json();
      setBookData(updatedBook);
      if (onUpdateBook) {
        onUpdateBook(updatedBook);
      }
    } catch (error) {
      console.error('Error updating book progress:', error);
      setEditableLastPage(lastPage);
    } finally {
      setIsUpdating(false);
    }
  };

  // Use bookData if available, otherwise fall back to props
  const displayLastRead = bookData?.last_read || lastRead;
  const displayLastPage = editableLastPage;

  return (
    <div className="col-12 mb-4">
      <div
        className="d-flex align-items-center"
        style={{
          backgroundColor: "#FFE5E5",
          borderRadius: "8px",
          padding: "10px 15px",
          overflow: "hidden",
          whiteSpace: "nowrap",
          maxWidth: "100%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ flexShrink: 0, marginRight: "15px" }}>
          <img
            src={imageUrl}
            alt={title}
            style={{
              width: "80px",
              height: "auto",
              borderRadius: "5px",
              minWidth: "80px",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            minWidth: 0,
          }}
        >
          <div className="d-flex justify-content-between">
            <div
              style={{
                fontWeight: "700",
                fontSize: "1rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {title} <span style={{ fontWeight: "normal" }}>by {author}</span>
            </div>
            <div style={{ fontSize: "0.85rem", color: "#888", marginLeft: "15px" }}>
              {isFinished ? (
                <span
                  style={{
                    backgroundColor: "#B5FFA8",
                    padding: "3px 8px",
                    borderRadius: "5px",
                    fontWeight: "800",
                    fontSize: "0.9rem",
                  }}
                >
                  FINISHED
                </span>
              ) : (
                `Read from ${displayLastRead.split(" ")[0]}`
              )}
            </div>
          </div>
          <div className="d-flex align-items-center mt-2" style={{ width: "100%" }}>
            <div
              style={{
                flexGrow: 1,
                height: "8px",
                backgroundColor: "#f3f3f3",
                borderRadius: "5px",
                position: "relative",
                overflow: "hidden",
                marginRight: "10px",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  backgroundColor: "#4caf50",
                  transition: "width 0.5s ease",
                }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>
              <input
                type="text"
                value={displayLastPage}
                onChange={handleLastPageChange}
                disabled={isUpdating}
                style={{
                  width: "40px",
                  fontSize: "1rem",
                  fontWeight: "800",
                  textAlign: "right",
                  border: "none",
                  outline: "none",
                  backgroundColor: "transparent",
                  marginRight: "4px",
                }}
              />
              <span style={{ fontWeight: "800", fontSize: "1rem" }}> / {totalPage} Pages</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Library;