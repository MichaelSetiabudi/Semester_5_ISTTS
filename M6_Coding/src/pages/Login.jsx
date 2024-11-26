import { Form, useActionData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Login() {
  const actionData = useActionData();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (actionData?.success === true) {
      navigate(actionData.redirectTo);
    } else if (actionData?.success === false) {
      setErrorMessage("Username atau password tidak sesuai");  
    }
  }, [actionData, navigate]);

  const styles = {
    container: {
      width: "100%",
      maxWidth: "400px",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      padding: "2rem",
      boxSizing: "border-box",
      margin: "20px",
    },
    logo: {
      fontSize: "2rem",
      color: "#f85532",
      textAlign: "center",
      marginBottom: "2rem",
      fontWeight: "bold",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    input: {
      padding: "0.75rem",
      borderRadius: "4px",
      border: "1px solid #ddd",
      fontSize: "1rem",
    },
    button: {
      padding: "0.75rem",
      backgroundColor: "#f85532",
      color: "white",
      border: "none",
      borderRadius: "4px",
      fontSize: "1rem",
      cursor: "pointer",
    },
    error: {
      color: "red",
      textAlign: "center",
      marginTop: "1rem",
      fontSize: "1rem",
      border: "1px solid red",
      padding: "10px",
      borderRadius: "4px",
      backgroundColor: "#f8d7da",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.logo}>SOPI</div>
      <Form method="post" style={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Login
        </button>

        {errorMessage && (
          <div style={styles.error}>
            {errorMessage} 
          </div>
        )}
      </Form>
    </div>
  );
}
