/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import AdminMenu from "./pages/adminMenu";
import LoginMenu from "./pages/loginMenu";
function LoginPage({ onLoginSuccess, users, setUserLoggedIn }) {
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

  const checkUserCredentials = (email, password) => {
    if (email === "admin" && password === "admin") {
      return "admin";
    }
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      setUserLoggedIn(user);
    }
    return user ? "user" : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;

    const role = checkUserCredentials(email, password);
    if (!role) {
      setErrorMessage("Email atau password salah.");
      return;
    }
    setErrorMessage("");
    onLoginSuccess(role);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
        padding: "2rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "25rem",
          padding: "2rem",
          backgroundColor: "#fff",
          borderRadius: "0.75rem",
          boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.3)",
          textAlign: "center",
        }}
      >
        <h2
          style={{ marginBottom: "1.5rem", color: "#333", fontSize: "1.5rem" }}
        >
          Login to LKOMP Library
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.25rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "1rem",
                color: "#555",
              }}
            >
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
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "1rem",
                color: "#555",
              }}
            >
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
            <p
              style={{
                color: "red",
                marginBottom: "1.25rem",
                fontSize: "0.875rem",
              }}
            >
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
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg",
      total_pages: 115,
      day_added: "2023-01-15T10:30:00",
    },
    {
      id: 2,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg/220px-The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg",
      total_pages: 224,
      day_added: "2022-05-22T14:45:00",
    },
    {
      id: 3,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg",
      total_pages: 281,
      day_added: "2023-09-08T09:15:00",
    },
    {
      id: 4,
      title: "1984",
      author: "George Orwell",
      image_url: "https://cdn.gramedia.com/uploads/items/9780451524935.jpg",
      total_pages: 328,
      day_added: "2023-03-10T11:00:00",
    },
    {
      id: 5,
      title: "The Phantom of the Opera",
      author: "Gaston Leroux",
      image_url:
        "https://m.media-amazon.com/images/M/MV5BNDczNzg4OTM3MV5BMl5BanBnXkFtZTcwOTQzMTEzMw@@._V1_.jpg",
      total_pages: 190,
      day_added: "2023-02-10T11:00:00",
    },
    {
      id: 6,
      title: "The Alchemist",
      author: "Paulo Coelho",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhM2P-YDSJ1CTvekqJ29Nepvn69q6evyipFg&s",
      total_pages: 208,
      day_added: "2022-02-10T11:00:00",
    },
  ]);
  const [usersBook, setUsersBook] = useState({
    "0001": [
      {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        image_url:
          "https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg",
        last_pages: 50,
        total_pages: 115,
        last_read: "04/03/2024",
      },
      {
        id: 2,
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        image_url:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg/220px-The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg",
        last_pages: 100,
        total_pages: 224,
        last_read: "15/02/2024",
      },
      {
        id: 2,
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        image_url:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg/220px-The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg",
        last_pages: 100,
        total_pages: 224,
        last_read: "10/02/2024",
      },
    ],
    "0002": [
      {
        id: 3,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        image_url:
          "https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg",
        last_pages: 100,
        total_pages: 281,
        last_read: "01/03/2024",
      },
      {
        id: 4,
        title: "The Year of 1984",
        author: "George Orwell",
        image_url: "https://cdn.gramedia.com/uploads/items/9780451524935.jpg",
        last_pages: 200,
        total_pages: 328,
        last_read: "12/03/2024",
      },
    ],
    "0003": [
      {
        id: 5,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        last_pages: 200,
        total_pages: 279,
        image_url: "https://cdn.gramedia.com/uploads/items/9780451524935.jpg",
        last_read: "15/03/2024",
      },
    ],
  });

  const [users, setUsers] = useState([
    {
      id: "0001",
      username: "dummy1",
      password: "123",
      email: "dummy1@example.com",
      join_at: "2024-01-15",
    },
    {
      id: "0002",
      username: "dummy2",
      password: "123",
      email: "dummy2@example.com",
      join_at: "2024-02-20",
    },
    {
      id: "0003",
      username: "dummy3",
      password: "123",
      email: "dummy3@example.com",
      join_at: "2024-03-10",
    },
  ]);
  const [userRole, setUserRole] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(null);
  const handleLoginSuccess = (role) => {
    setUserRole(role);
    setRoute(role === "admin" ? "admin" : "userMenu");
  };
  return (
    <div>
      {route === "login" ? (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          users={users}
          setUserLoggedIn={setUserLoggedIn}
        />
      ) : route === "admin" ? (
        <AdminMenu
          books={books}
          users={users}
          setBooks={setBooks}
          setUsers={setUsers}
          setRoute={setRoute}
        />
      ) : route === "userMenu" ? (
        <LoginMenu
          userLoggedIn={userLoggedIn}
          users={users}
          setUsers={setUsers}
          setRoute={setRoute}
          books={books}
          setUsersBook={setUsersBook}
          usersBook={usersBook}
        />
      ) : null}
    </div>
  );
}

export default App;
