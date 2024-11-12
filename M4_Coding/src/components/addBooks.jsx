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

function AddBooks({ fetchBooks, setActivePage }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: joiResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const bookData = {
        ...data,
        total_pages: parseInt(data.total_pages, 10)
      };

      const response = await fetch('http://localhost:3000/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.field) {
          setError(errorData.field, {
            type: 'manual',
            message: errorData.message,
          });
        } else {
          setError('root.serverError', {
            type: 'manual',
            message: errorData.message || 'An error occurred while adding the book.',
          });
        }
        return;
      }

      await fetchBooks();
      setActivePage("home");
    } catch (error) {
      console.error('Error adding book:', error);
      setError('root.serverError', {
        type: 'manual',
        message: 'An error occurred while adding the book. Please try again.',
      });
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px" }}>
      <h1 style={{ fontWeight: "700" }}>Add Book</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column" }}>
        {errors.root?.serverError && (
          <p style={{ color: "red", marginBottom: "1rem" }}>
            {errors.root.serverError.message}
          </p>
        )}

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