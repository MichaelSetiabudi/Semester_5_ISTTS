import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(5)
    .max(50)
    .required()
    .label("Email"),
  username: Joi.string().min(5).max(100).required().label("Name"),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*()_+]*$"))
    .required()
    .label("Password")
    .messages({
      "string.pattern.base":
        "Password must contain uppercase letters, numbers, and special characters.",
    }),
});

function AddUsers({ users, setUsers, setActivePage }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  const onSubmit = (data) => {
    const newUser = {
      ...data,
      id: getNextId(), // Get the next ID based on existing users
      join_at: formatDate(new Date()),
    };
    setUsers([...users, newUser]);
    setActivePage("home");
  };

  const getNextId = () => {
    let maxId = 0;
    for (const user of users) {
      const numericId = parseInt(user.id, 10);
      if (numericId > maxId) {
        maxId = numericId;
      }
    }
    const nextId = (maxId + 1).toString().padStart(4, '0');
    return nextId;
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px" }}>
      <h1 style={{ fontWeight: "700" }}>Add User</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          type="text"
          placeholder="Email"
          {...register("email")}
          style={{
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: "8px",
            border: "1px solid black",
          }}
        />
        {errors.email && <ErrorMessage message={errors.email.message} />}

        <input
          type="text"
          placeholder="Name"
          {...register("username")}
          style={{
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: "8px",
            border: "1px solid black",
          }}
        />
        {errors.username && <ErrorMessage message={errors.username.message} />}

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          style={{
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: "8px",
            border: "1px solid black",
          }}
        />
        {errors.password && <ErrorMessage message={errors.password.message} />}

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
          Add User
        </button>
      </form>
    </div>
  );
}

const ErrorMessage = ({ message }) => <p style={{ color: "red" }}>{message}</p>;

export default AddUsers;
