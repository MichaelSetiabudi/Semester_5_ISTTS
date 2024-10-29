import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

const schema = Joi.object({
  title: Joi.string().min(5).max(100).required().label("Title"),
  author: Joi.string().min(5).max(50).required().label("Author"),
  total_pages: Joi.number().integer().min(20).max(5000).required().label("Page"),
  image_url: Joi.string().min(10).max(255).required().label("Image Link"),
});

function AddBooks({ books, setBooks, setActivePage }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  const onSubmit = (data) => {
    const newBook = {
      ...data,
      id: getNextId(), // Get the next ID based on existing books
      day_added: new Date()
        .toLocaleString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
        .replace(",", ""),
    };
    setBooks([...books, newBook]);
    setActivePage("home");
  };

  const getNextId = () => {
    let maxId = 0; // Initialize maxId to 0
    for (const book of books) {
      if (book.id > maxId) {
        maxId = book.id; // Update maxId if current book's ID is higher
      }
    }
    return maxId + 1; // Return the next ID
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px" }}>
      <h1 style={{ fontWeight: "700" }}>Add Book</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="text"
          placeholder="Title"
          {...register("title")}
          style={{
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: "8px",
            border: "1px solid black",
          }}
        />
        {errors.title && <p style={{ color: "red" }}>{errors.title.message}</p>}

        <input
          type="text"
          placeholder="Author"
          {...register("author")}
          style={{
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: "8px",
            border: "1px solid black",
          }}
        />
        {errors.author && <p style={{ color: "red" }}>{errors.author.message}</p>}

        <input
          type="number"
          placeholder="Page"
          {...register("total_pages")}
          style={{
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: "8px",
            border: "1px solid black",
          }}
        />
        {errors.total_pages && <p style={{ color: "red" }}>{errors.total_pages.message}</p>}

        <input
          type="text"
          placeholder="Image Link"
          {...register("image_url")}
          style={{
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: "8px",
            border: "1px solid black",
          }}
        />
        {errors.image_url && <p style={{ color: "red" }}>{errors.image_url.message}</p>}

        <button
          type="submit"
          style={{
            backgroundColor: "#F66B6B",
            color: "white",
            padding: "0.7rem",
            borderRadius: "8px",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Add Book
        </button>
      </form>
    </div>
  );
}

export default AddBooks;
