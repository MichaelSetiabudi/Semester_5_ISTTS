/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import AdminMenu from "./pages/adminMenu";
import LoginMenu from "./pages/loginMenu";

const API_URL = 'http://localhost:3000/api';

function LoginPage({ onLoginSuccess }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        setErrorMessage(data.message);
        return;
      }
      
      setErrorMessage("");
      onLoginSuccess(data.role, data.user);
    } catch (error) {
      setErrorMessage("An error occurred during login.");
    }
  };

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f0f2f5",
      padding: "2rem",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "25rem",
        padding: "2rem",
        backgroundColor: "#fff",
        borderRadius: "0.75rem",
        boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.3)",
        textAlign: "center",
      }}>
        <h2 style={{ marginBottom: "1.5rem", color: "#333", fontSize: "1.5rem" }}>
          Login to LKOMP Library
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{
              display: "block",
              marginBottom: "0.5rem",
              fontSize: "1rem",
              color: "#555",
            }}>
              Email
            </label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid #ccc",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
              placeholder="Enter your email"
            />
          </div>
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{
              display: "block",
              marginBottom: "0.5rem",
              fontSize: "1rem",
              color: "#555",
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid #ccc",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
              placeholder="Enter your password"
            />
          </div>
          {errorMessage && (
            <p style={{
              color: "red",
              marginBottom: "1.25rem",
              fontSize: "0.875rem",
            }}>
              {errorMessage}
            </p>
          )}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#ff4757",
              color: "#fff",
              borderRadius: "0.5rem",
              border: "none",
              fontSize: "1.125rem",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

function App() {
  const [route, setRoute] = useState("login");
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(null);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${API_URL}/books`);
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    if (userRole) {
      fetchBooks();
      if (userRole === 'admin') {
        fetchUsers();
      }
    }
  }, [userRole]);

  const handleLoginSuccess = (role, user) => {
    setUserRole(role);
    setUserLoggedIn(user);
    setRoute(role === "admin" ? "admin" : "userMenu");
  };

  return (
    <div>
      {route === "login" ? (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      ) : route === "admin" ? (
        <AdminMenu
          books={books}
          users={users}
          setBooks={setBooks}
          setUsers={setUsers}
          setRoute={setRoute}
          apiUrl={API_URL}
        />
      ) : route === "userMenu" ? (
        <LoginMenu
          userLoggedIn={userLoggedIn}
          users={users}
          setUsers={setUsers}
          setRoute={setRoute}
          books={books}
          apiUrl={API_URL}
        />
      ) : null}
    </div>
  );
}

export default App;
