import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

const schema = Joi.object({
  title: Joi.string().min(5).max(100).required().label("Title"),
  author: Joi.string().min(5).max(50).required().label("Author"),
  page: Joi.number().integer().min(20).max(5000).required().label("Page"),
  imageUrl: Joi.string().min(10).max(255).required().label("Image Link"),
});

function AddBooks({ onAddBook }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  const onSubmit = (data) => {
    onAddBook(data);
    reset();
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px" }}>
      <h1 style={{ fontWeight: "700" }}>Admin</h1>
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
          {...register("page")}
          style={{
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: "8px",
            border: "1px solid black",
          }}
        />
        {errors.page && <p style={{ color: "red" }}>{errors.page.message}</p>}

        <input
          type="text"
          placeholder="Image Link"
          {...register("imageUrl")}
          style={{
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: "8px",
            border: "1px solid black",
          }}
        />
        {errors.imageUrl && <p style={{ color: "red" }}>{errors.imageUrl.message}</p>}

        <button
          type="submit"
          style={{
            backgroundColor: "#90EE90",
            padding: "0.5rem",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          ADD
        </button>
      </form>
    </div>
  );
}

export default AddBooks;
