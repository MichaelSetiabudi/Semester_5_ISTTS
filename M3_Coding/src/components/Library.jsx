/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";

function Library({
  imageUrl,
  title,
  author,
  lastRead,
  lastPage,
  totalPage,
  setUsersBook,
  usersBook,
  user_id,
}) {
  const [editableLastPage, setEditableLastPage] = useState(lastPage);
  const progress = totalPage > 0 ? (editableLastPage / totalPage) * 100 : 0;
  const isFinished = editableLastPage >= totalPage;
  const getTodayDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const handleLastPageChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = Math.max(0, Math.min(totalPage, Number(value)));
    setEditableLastPage(value);

    setUsersBook((prevUsersBook) => {
      const updatedBooks = prevUsersBook[user_id]?.map((book) =>
        book.title === title
          ? { ...book, last_pages: value, last_read: getTodayDate() }
          : book
      );
      return {
        ...prevUsersBook,
        [user_id]: updatedBooks,
      };
    });
  };

  return (
    <div className="col-12 mb-4">
      <div
        className="d-flex align-items-center p-0"
        style={{
          backgroundColor: "#FFE5E5",
          borderRadius: "8px",
        }}
      >
        <div className="p-3" style={{ flexShrink: 0, marginLeft: "2vw" }}>
          <img
            src={imageUrl}
            alt={title}
            style={{
              width: "80px",
              height: "auto",
              borderRadius: "5px",
            }}
          />
        </div>
        <div
          style={{
            flexGrow: 1,
            marginLeft: "3vw",
            paddingTop: "0",
            marginTop: "0",
          }}
        >
          <div className="container-fluid d-flex p-0 m-0 justify-content-between">
            <div
              className="container p-0"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <h3
                style={{ marginBottom: "0.5rem", margin: 0, fontWeight: "700" }}
              >
                {title}{" "}
                <span style={{ fontWeight: "normal", fontSize: "1rem" }}>
                  by {author}
                </span>
              </h3>
            </div>
            <div
              className="container"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              {isFinished && (
                <span
                  style={{
                    backgroundColor: "#B5FFA8",
                    color: "#333",
                    fontSize: "14px",
                    padding: "4px 10px",
                    borderRadius: "5px",
                    fontWeight: "800",
                  }}
                >
                  FINISH READ
                </span>
              )}
              <h3
                style={{
                  margin: "0",
                  color: "#888",
                  fontSize: "1.2rem",
                  marginRight: "2rem",
                  padding: "0",
                }}
              >
                Read from {lastRead.split(" ")[0]}
              </h3>
            </div>
          </div>
          <div className="d-flex align-items-center mt-2">
            <div
              className="progress-container m-0"
              style={{
                flexGrow: 1,
                backgroundColor: "#f3f3f3",
                height: "1vw",
                borderRadius: "5px",
                position: "relative",
                overflow: "hidden",
                maxWidth: "100%",
                width: "90%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: "#4caf50",
                  height: "100%",
                  width: `${progress}%`,
                  transition: "width 0.5s ease",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              <input
                type="text"
                value={editableLastPage}
                onChange={handleLastPageChange}
                style={{
                  whiteSpace: "nowrap",
                  color: "black",
                  fontSize: "2vh",
                  fontWeight: "800",
                  width: "50px",
                  textAlign: "right",
                  border: "none",
                  outline: "none",
                  background: "none",
                  marginRight: "4px",
                }}
              />
              <span
                style={{ color: "black", fontSize: "2vh", fontWeight: "800" }}
              >
                / {totalPage} Pages
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Library;
