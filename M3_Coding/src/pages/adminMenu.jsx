// adminMenu.jsx
import React from "react";
import datajson from "../assets/data.json";
import logonavbar from "../assets/book.png";
import Library from "../components/adminLibrary";

function AdminMenu({ books, setBooks, users, setUsers }) {
  const user_id = "0001";
  const userData = datajson.find((user) => user.user.id === user_id);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{
          backgroundColor: "#F66B6B",
          padding: "1rem 1.5rem",
        }}
      >
        <div className="container-fluid d-flex align-items-center">
          <a
            className="navbar-brand d-flex align-items-center"
            href="#"
            style={{ color: "white", fontWeight: "bold" }}
          >
            <img
              src={logonavbar}
              alt="Logo"
              width="50"
              height="auto"
              className="d-inline-block align-text-top m-0 p-0"
            />
            <span
              style={{
                fontSize: "calc(12px + 1vw)",
                marginLeft: "0.5rem",
                marginRight: "3vw",
              }}
            >
              LKOMP LIBRARY
            </span>
          </a>
          <div className="d-flex">
            <a
              href="#"
              style={{
                color: "white",
                fontWeight: "bold",
                textDecoration: "none",
                marginRight: "3vw",
              }}
            >
              Home
            </a>
            <a
              href="#"
              style={{
                color: "white",
                fontWeight: "bold",
                textDecoration: "none",
                marginRight: "3vw",
              }}
            >
              Add Book
            </a>
            <a
              href="#"
              style={{
                color: "white",
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              Add User
            </a>
          </div>
        </div>
      </nav>

      <div className="container-fluid mt-4" style={{ overflowX: "hidden" }}>
        <div className="d-flex justify-content-between align-items-center">
          <h1 style={{ fontWeight: "700", marginLeft: "1vw" }}>Admin</h1>
          <button
            className="btn btn-danger"
            style={{
              borderRadius: "10px",
              padding: "0 1vw",
              marginRight: "1vw",
            }}
          >
            <h4>LOGOUT</h4>
          </button>
        </div>

        <div className="container-fluid" style={{ marginLeft: "1vw", marginRight: "5vw"}}>
          <div className="justify-content-between align-items-center mt-4 mb-3">
            <h1 style={{ fontWeight: "700" }}>List Book</h1>
            <input
              style={{
                width: "60%",
                borderRadius: "8px",
                height: "3vh",
                padding: "5px",
              }}
              type="text"
              placeholder="Search by title or author"
            />
          </div>
          <div className="container-fluid" style={{ paddingRight: "1rem" }}>
            <div className="row" style={{paddingRight:"5.3vw"}}>
              {userData.library && userData.library.length > 0 ? (
                userData.library.map((book) => (
                  <Library
                    key={book.id}
                    imageUrl={book.image_url}
                    title={book.title}
                    author={book.author}
                    totalPage={book.total_pages}
                  />
                ))
              ) : (
                <p>Tidak ditemukan buku</p>
              )}
            </div>
          </div>
        </div>

        <div className="container-fluid bg-warning" style={{ marginLeft: "1vw", marginRight: "5vw"}}>
          <div className="justify-content-between align-items-center mt-4 mb-3">
            <h1 style={{ fontWeight: "700" }}>List User</h1>
            <input
              style={{
                width: "60%",
                borderRadius: "8px",
                height: "3vh",
                padding: "5px",
              }}
              type="text"
              placeholder="Search by name or username"
            />
          </div>
          <div className="container-fluid" style={{ paddingRight: "1rem" }}>
            <div className="row" style={{paddingRight:"5.3vw"}}>
              {userData.library && userData.library.length > 0 ? (
                userData.library.map((book) => (
                  <Library
                    key={book.id}
                    imageUrl={book.image_url}
                    title={book.title}
                    author={book.author}
                    totalPage={book.total_pages}
                  />
                ))
              ) : (
                <p>Tidak ditemukan buku</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminMenu;
