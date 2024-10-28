import React, { useState } from "react";
import Joi from "joi";
import AdminMenu from "./pages/adminMenu";

function LoginPage({ onLoginSuccess }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const schema = Joi.object({
    email: Joi.string().required().valid("admin").messages({
      "string.empty": "Email tidak boleh kosong.",
      "any.only": "Email tidak terdaftar.",
    }),
    password: Joi.string().required().valid("admin").messages({
      "string.empty": "Password tidak boleh kosong.",
      "any.only": "Password salah.",
    }),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = schema.validate(form);
    if (error) {
      setErrorMessage(error.details[0].message);
      return;
    }
    setErrorMessage("");
    onLoginSuccess();
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
    },
    {
      id: 2,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg/220px-The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg",
      total_pages: 224,
    },
    {
      id: 3,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg",
      total_pages: 281,
    },
    {
      id: 4,
      title: "The Year of 1984",
      author: "George Orwell",
      image_url: "https://cdn.gramedia.com/uploads/items/9780451524935.jpg",
      total_pages: 328,
    },
  ]);
  const [users, setUsers] = useState([
    {
      username: "dummy1",
      password: "123",
      email: "dummy1@example.com",
      join_at: "2024-01-15",
      my_book: [
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
      ],
    },
    {
      username: "dummy2",
      password: "123",
      email: "dummy2@example.com",
      join_at: "2024-02-20",
      my_book: [
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
    },
    {
      username: "dummy3",
      password: "123",
      email: "dummy3@example.com",
      join_at: "2024-03-10",
      my_book: [
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
    },
  ]);

  const handleLoginSuccess = () => {
    setRoute("admin");
  };

  return (
    <div>
      {route === "login" ? (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      ) : (
        <AdminMenu books={books} setBooks={setBooks} users={users} setUsers={setUsers} />
      )}
    </div>
  );
}

export default App;
