import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import axios from "axios";

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

function AddUsers({ fetchUsers, setActivePage }) {
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
      await axios.post('http://localhost:3001/api/users', data, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      await fetchUsers();
      setActivePage("home");
    } catch (error) {
      console.error('Error adding user:', error);
      
      if (error.response?.data) {
        const errorData = error.response.data;
        if (errorData.field) {
          setError(errorData.field, {
            type: 'manual',
            message: errorData.message,
          });
        } else {
          setError('root.serverError', {
            type: 'manual',
            message: errorData.message || 'An error occurred while adding the user.',
          });
        }
      } else {
        setError('root.serverError', {
          type: 'manual',
          message: 'An error occurred while adding the user. Please try again.',
        });
      }
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px" }}>
      <h1 style={{ fontWeight: "700" }}>Add User</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {errors.root?.serverError && (
          <ErrorMessage message={errors.root.serverError.message} />
        )}

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