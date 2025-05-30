import React, { useState, useEffect } from "react";
import axios from "axios";
import logonavbar from "../assets/book.png";
import Library from "../components/adminLibrary";
import ListUser from "../components/listUser";
import AddBooks from "../components/addBooks";
import AddUsers from "../components/addUsers";

// Base URL configuration for axios
const API_BASE_URL = "http://localhost:3001/api";
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

function AdminMenu({ setRoute }) {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookSearch, setBookSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [activePage, setActivePage] = useState("home");
  const [error, setError] = useState(null);

  // Fetch books and users on component mount
  useEffect(() => {
    fetchBooks();
    fetchUsers();
  }, []);

  // Fetch books from API using axios
  const fetchBooks = async () => {
    try {
      const response = await axiosInstance.get("/books");
      setBooks(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError(error.response?.data?.message || "Failed to fetch books");
    }
  };

  // Fetch users from API using axios
  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/users");
      setUsers(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(error.response?.data?.message || "Failed to fetch users");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axiosInstance.delete(`/users/${userId}`);
      setUsers(users.filter((u) => u.id !== userId));
      setError(null);
    } catch (error) {
      console.error("Error deleting user:", error);
      setError(error.response?.data?.message || "Failed to delete user");
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await axiosInstance.delete(`/books/${bookId}`);
      // Refresh books list after deletion
      fetchBooks();
      setError(null);
    } catch (error) {
      console.error("Error deleting book:", error);
      setError(error.response?.data?.message || "Failed to delete book");
    }
  };

  // Filter books based on search
  const filteredBooks = books.filter(
    (book) =>
      book.title?.toLowerCase().includes(bookSearch.toLowerCase()) ||
      book.author?.toLowerCase().includes(bookSearch.toLowerCase())
  );

  // Filter users based on search
  const filteredUsers = users.filter(
    (user) =>
      user.username?.toLowerCase().includes(userSearch.toLowerCase()) ||
      user.email?.toLowerCase().includes(userSearch.toLowerCase())
  );

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
            <a
              href="#"
              style={{
                color: "white",
                fontWeight: "bold",
                textDecoration: activePage === "home" ? "underline" : "none",
                marginRight: "3vw",
              }}
              onClick={() => setActivePage("home")}
            >
              Home
            </a>
            <a
              href="#"
              style={{
                color: "white",
                fontWeight: "bold",
                textDecoration:
                  activePage === "addBooks" ? "underline" : "none",
                marginRight: "3vw",
              }}
              onClick={() => setActivePage("addBooks")}
            >
              Add Book
            </a>
            <a
              href="#"
              style={{
                color: "white",
                fontWeight: "bold",
                textDecoration: activePage === "addUser" ? "underline" : "none",
              }}
              onClick={() => setActivePage("addUser")}
            >
              Add User
            </a>
          </a>
        </div>
      </nav>

      <div className="container-fluid mt-4" style={{ overflowX: "hidden" }}>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {activePage === "home" ? (
          <>
            <div className="d-flex justify-content-between align-items-center">
              <h1 style={{ fontWeight: "700", marginLeft: "1vw" }}>Admin</h1>
              <button
                className="btn btn-danger"
                style={{
                  borderRadius: "10px",
                  padding: "1vh 1vw",
                  marginRight: "1vw",
                }}
                onClick={() => setRoute("login")}
              >
                <h4>LOGOUT</h4>
              </button>
            </div>
            <div className="container-fluid">
              <div
                className="justify-content-between align-items-center mt-4 mb-4"
                style={{ marginLeft: "1vw" }}
              >
                <h1 style={{ fontWeight: "700" }}>List Book</h1>
                <input
                  style={{
                    width: "92%",
                    borderRadius: "8px",
                    height: "3vh",
                    padding: "5px",
                  }}
                  type="text"
                  placeholder="Search by title or author"
                  value={bookSearch}
                  onChange={(e) => setBookSearch(e.target.value)}
                />
              </div>
              <div className="row" style={{ width: "92%", marginLeft: "1vw" }}>
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <Library
                      key={book.id}
                      imageUrl={book.image_url}
                      title={book.title}
                      author={book.author}
                      totalPage={book.total_pages}
                      onDelete={() => handleDeleteBook(book.id)}
                    />
                  ))
                ) : (
                  <p>Tidak ditemukan buku</p>
                )}
              </div>
            </div>
            <div className="container-fluid">
              <div
                className="justify-content-between align-items-center mt-4 mb-3"
                style={{ marginLeft: "1vw" }}
              >
                <h1 style={{ fontWeight: "700" }}>List User</h1>
                <input
                  style={{
                    width: "92%",
                    borderRadius: "8px",
                    height: "3vh",
                    padding: "5px",
                  }}
                  type="text"
                  placeholder="Search by name or email"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                />
              </div>
              <div className="row" style={{ width: "92%", marginLeft: "1vw" }}>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <ListUser
                      key={user.id}
                      username={user.username}
                      email={user.email}
                      join_at={user.join_at}
                      onDelete={() => handleDeleteUser(user.id)}
                    />
                  ))
                ) : (
                  <p>Tidak ditemukan user</p>
                )}
              </div>
            </div>
          </>
        ) : activePage === "addBooks" ? (
          <AddBooks fetchBooks={fetchBooks} setActivePage={setActivePage} />
        ) : activePage === "addUser" ? (
          <AddUsers fetchUsers={fetchUsers} setActivePage={setActivePage} />
        ) : null}
      </div>
    </>
  );
}

export default AdminMenu;
