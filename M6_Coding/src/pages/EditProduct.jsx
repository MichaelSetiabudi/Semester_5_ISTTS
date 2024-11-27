import React, { useState, useEffect } from "react";
import { Form, useLoaderData, useNavigate, Link } from "react-router-dom";

export default function EditProduct() {
  const product = useLoaderData();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: product.name,
    quantity: product.quantity,
    price: product.price,
    image: product.image,
  });

  const styles = {
    container: {
      width: "100%",
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    header: {
      backgroundColor: "#ee4d2d",
      color: "white",
      padding: "15px 20px",
      fontSize: "20px",
      fontWeight: "bold",
      borderTopLeftRadius: "3px",
      borderTopRightRadius: "3px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    content: {
      backgroundColor: "white",
      padding: "20px",
      borderBottomLeftRadius: "3px",
      borderBottomRightRadius: "3px",
      boxShadow: "0 1px 2px 0 rgba(0,0,0,0.13)",
    },
    formGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      color: "#333",
      fontWeight: "500",
    },
    idDisplay: {
      backgroundColor: "#f5f5f5",
      padding: "8px 12px",
      borderRadius: "3px",
      color: "#666",
      marginBottom: "15px",
    },
    input: {
      width: "100%",
      padding: "8px 0",
      border: "1px solid #ccc",
      borderRadius: "3px",
      fontSize: "14px",
    },
    inputError: {
      borderColor: "#ff4d4f",
    },
    errorText: {
      color: "#ff4d4f",
      fontSize: "12px",
      marginTop: "4px",
    },
    imagePreview: {
      width: "100px",
      height: "100px",
      objectFit: "cover",
      borderRadius: "3px",
      border: "1px solid #ddd",
      marginTop: "8px",
    },
    buttonGroup: {
      marginTop: "30px",
      display: "flex",
      gap: "10px",
    },
    button: {
      padding: "10px 20px",
      border: "none",
      borderRadius: "3px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
    },
    updateButton: {
      backgroundColor: "#ee4d2d",
      color: "white",
      "&:hover": {
        backgroundColor: "#d73211",
      },
    },
    cancelButton: {
      backgroundColor: "#fff",
      color: "#555",
      border: "1px solid #ddd",
      "&:hover": {
        backgroundColor: "#f5f5f5",
      },
    },
    pricePrefix: {
      position: "relative",
    },
    pricePrefixText: {
      position: "absolute",
      left: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#666",
    },
    priceInput: {
      paddingLeft: "45px",
    },
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || formData.name.trim() === "") {
      newErrors.name = "Nama barang harus diisi";
    }

    if (!formData.image || formData.image.trim() === "") {
      newErrors.image = "URL gambar harus diisi";
    }

    const quantity = Number(formData.quantity);
    if (isNaN(quantity) || quantity < 1) {
      newErrors.quantity = "Quantity harus lebih dari atau sama dengan 1";
    }

    const price = Number(formData.price);
    if (isNaN(price) || price < 5000) {
      newErrors.price = "Harga harus lebih dari atau sama dengan Rp 5.000";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      const updatedErrors = { ...errors };
      delete updatedErrors[name];
      setErrors(updatedErrors);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={{ margin: 0, fontSize: "20px" }}>Edit Barang</h1>
        <Link
          to="/admin/barang"
          style={{ color: "white", textDecoration: "none", fontSize: "14px" }}
        >
          Kembali
        </Link>
      </div>

      <div style={styles.content}>
        <Form method="put">
          <div style={styles.idDisplay}>
            <strong>ID: </strong>
            {product.id}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Nama Barang:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={{
                ...styles.input,
                ...(errors.name ? styles.inputError : {}),
              }}
            />
            {errors.name && <div style={styles.errorText}>{errors.name}</div>}
          </div>

          <div style={styles.formGroup}>
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                style={styles.imagePreview}
              />
            )}
            <label style={styles.label}>URL Gambar:</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              style={{
                ...styles.input,
                ...(errors.image ? styles.inputError : {}),
              }}
            />

            {errors.image && <div style={styles.errorText}>{errors.image}</div>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
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

          <div style={styles.formGroup}>
            <label style={styles.label}>Harga:</label>
            <div style={styles.pricePrefix}>
              <span style={styles.pricePrefixText}>Rp</span>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="5000"
                style={{
                  ...styles.input,
                  ...styles.priceInput,
                  ...(errors.price ? styles.inputError : {}),
                }}
              />
            </div>
            {errors.price && <div style={styles.errorText}>{errors.price}</div>}
          </div>

          <div style={styles.buttonGroup}>
            <button
              type="submit"
              style={{ ...styles.button, ...styles.updateButton }}
              onClick={(e) => {
                if (!validateForm()) {
                  e.preventDefault();
                }
              }}
            >
              Update
            </button>
            <button
              type="button"
              style={{ ...styles.button, ...styles.cancelButton }}
              onClick={() => navigate("/admin/barang")}
            >
              Batal
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
