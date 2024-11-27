import React, { useState, useEffect } from "react";
import {
  Link,
  useLoaderData,
  Form,
  useNavigate,
  useActionData,
} from "react-router-dom";

export default function AdminDashboard() {
  const products = useLoaderData();
  const actionData = useActionData();
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [newProduct, setNewProduct] = useState({
    name: "",
    quantity: "",
    price: "",
    image: "",
  });

  const styles = {
    container: {
      width: "100%",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh",
    },
    alertContainer: {
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 1000,
      width: "100%",
      maxWidth: "500px",
    },
    alert: {
      padding: "15px",
      borderRadius: "4px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      transition: "opacity 0.3s ease",
    },
    successAlert: {
      backgroundColor: "#4caf50",
      color: "white",
    },
    errorAlert: {
      backgroundColor: "#f44336",
      color: "white",
    },
    alertCloseButton: {
      background: "none",
      border: "none",
      color: "white",
      fontSize: "20px",
      cursor: "pointer",
    },
    header: {
      backgroundColor: "#ee4d2d",
      color: "white",
      padding: "1rem",
      borderRadius: "4px",
      marginBottom: "1.5rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
    },
    content: {
      backgroundColor: "white",
      padding: "1.5rem",
      borderRadius: "4px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "2rem",
    },
    th: {
      backgroundColor: "#f0f0f0",
      padding: "12px",
      textAlign: "left",
      borderBottom: "1px solid #ddd",
      fontWeight: "600",
    },
    td: {
      padding: "12px",
      borderBottom: "1px solid #ddd",
    },
    productImage: {
      width: "10rem",
      height: "10rem",
      objectFit: "cover",
      borderRadius: "4px",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      border: "1px solid #ddd",
      borderRadius: "4px",
    },
    inputError: {
      borderColor: "#f44336",
    },
    errorText: {
      color: "#f44336",
      fontSize: "0.875rem",
      marginTop: "-8px",
      marginBottom: "10px",
    },
    button: {
      padding: "10px 15px",
      backgroundColor: "#ee4d2d",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginRight: "10px",
    },
    actionButton: {
      padding: "6px 12px",
      borderRadius: "4px",
      cursor: "pointer",
      marginRight: "5px",
    },
    editButton: {
      backgroundColor: "#2196F3",
      color: "white",
      border: "none",
    },
    deleteButton: {
      backgroundColor: "#f44336",
      color: "white",
      border: "none",
    },
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!newProduct.name || newProduct.name.trim() === "") {
      newErrors.name = "Nama barang harus diisi";
    }

    if (!newProduct.image || newProduct.image.trim() === "") {
      newErrors.image = "URL gambar harus diisi";
    }

    const quantity = Number(newProduct.quantity);
    if (isNaN(quantity) || quantity < 1) {
      newErrors.quantity = "Quantity harus lebih dari atau sama dengan 1";
    }

    const price = Number(newProduct.price);
    if (isNaN(price) || price < 5000) {
      newErrors.price = "Harga harus lebih dari atau sama dengan Rp 5.000";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });

    // Clear specific error when user starts typing
    if (errors[name]) {
      const updatedErrors = { ...errors };
      delete updatedErrors[name];
      setErrors(updatedErrors);
    }
  };

  // Price formatting function
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  // Effect to handle form submission results
  useEffect(() => {
    if (actionData) {
      if (actionData.success) {
        setShowAlert(true);
        setAlertType("success");
        setNewProduct({
          name: "",
          quantity: "",
          price: "",
          image: "",
        });

        setErrors({});
      } else if (actionData.errors) {
        setShowAlert(true);
        setAlertType("error");
        setErrors(actionData.errors);
      }

      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [actionData]);

  return (
    <div style={styles.container}>
      {/* Alert */}
      {showAlert && (
        <div style={styles.alertContainer}>
          <div
            style={{
              ...styles.alert,
              ...(alertType === "success"
                ? styles.successAlert
                : styles.errorAlert),
            }}
          >
            <span>
              {alertType === "success"
                ? actionData.message
                : "Terjadi kesalahan saat menambahkan produk"}
            </span>
            <button
              style={styles.alertCloseButton}
              onClick={() => setShowAlert(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={styles.header}>
        <h1>Master Barang</h1>
        <Link
          to="/"
          style={{
            ...styles.button,
            backgroundColor: "white",
            color: "#ee4d2d",
          }}
        >
          Logout
        </Link>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {/* Product Table */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Nama Barang</th>
              <th style={styles.th}>Gambar</th>
              <th style={styles.th}>Qty</th>
              <th style={styles.th}>Harga</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{product.name}</td>
                <td style={styles.td}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={styles.productImage}
                  />
                </td>
                <td style={styles.td}>{product.quantity}</td>
                <td style={styles.td}>{formatPrice(product.price)}</td>
                <td style={styles.td}>
                  <Link
                    to={`/admin/barang/${product.id}`}
                    style={{ ...styles.actionButton, ...styles.editButton }}
                  >
                    Edit
                  </Link>
                  <Form
                    method="delete"
                    action={`/admin/barang/${product.id}`}
                    style={{ display: "inline" }}
                    onSubmit={(e) => {
                      if (
                        !confirm(
                          "Apakah Anda yakin ingin menghapus produk ini?"
                        )
                      ) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <button
                      type="submit"
                      style={{ ...styles.actionButton, ...styles.deleteButton }}
                    >
                      Delete
                    </button>
                  </Form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Product Add Form */}
        <Form method="post">
          <h2 style={{ marginBottom: "15px" }}>Tambah Barang Baru</h2>
          {/* Name Input */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Nama Barang"
              value={newProduct.name}
              onChange={handleInputChange}
              style={{
                ...styles.input,
                ...(errors.name ? styles.inputError : {}),
              }}
            />
            {errors.name && <div style={styles.errorText}>{errors.name}</div>}
          </div>

          {/* Image Input */}
          <div>
            <input
              type="url"
              name="image"
              placeholder="URL Gambar"
              value={newProduct.image}
              onChange={handleInputChange}
              style={{
                ...styles.input,
                ...(errors.image ? styles.inputError : {}),
              }}
            />
            {errors.image && <div style={styles.errorText}>{errors.image}</div>}
          </div>

          {/* Quantity Input */}
          <div>
            <input
              type="number"
              name="quantity"
              placeholder="Jumlah"
              value={newProduct.quantity}
              onChange={handleInputChange}
              min="1"
              style={{
                ...styles.input,
                ...(errors.quantity ? styles.inputError : {}),
              }}
            />
            {errors.quantity && (
              <div style={styles.errorText}>{errors.quantity}</div>
            )}
          </div>

          {/* Price Input */}
          <div>
            <input
              type="number"
              name="price"
              placeholder="Harga"
              value={newProduct.price}
              onChange={handleInputChange}
              min="5000"
              style={{
                ...styles.input,
                ...(errors.price ? styles.inputError : {}),
              }}
            />
            {errors.price && <div style={styles.errorText}>{errors.price}</div>}
          </div>

          <button
            type="submit"
            style={styles.button}
            onClick={(e) => {
              if (!validateForm()) {
                e.preventDefault();
              }
            }}
          >
            Tambahkan Barang
          </button>
        </Form>
      </div>
    </div>
  );
}
