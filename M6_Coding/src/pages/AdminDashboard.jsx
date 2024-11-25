import {
  Link,
  useLoaderData,
  Form,
  useNavigate,
  useActionData,
} from "react-router-dom";
import { useState } from "react";

export default function AdminDashboard() {
  const products = useLoaderData();
  const actionData = useActionData();
  const [errors, setErrors] = useState({});
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
    button: {
      padding: "0.5rem 1rem",
      backgroundColor: "white",
      color: "#ee4d2d",
      border: "none",
      borderRadius: "4px",
      textDecoration: "none",
      cursor: "pointer",
      fontSize: "0.9rem",
      fontWeight: "500",
    },
    addButton: {
      padding: "0.5rem 1rem",
      backgroundColor: "#ee4d2d",
      color: "white",
      border: "none",
      borderRadius: "4px",
      textDecoration: "none",
      marginBottom: "1rem",
      display: "inline-block",
      cursor: "pointer",
      fontSize: "0.9rem",
      fontWeight: "500",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "1rem",
    },
    th: {
      backgroundColor: "#fafafa",
      padding: "12px 16px",
      textAlign: "left",
      borderBottom: "1px solid #efefef",
      color: "#555555",
      fontSize: "0.95rem",
      fontWeight: "500",
    },
    td: {
      padding: "16px",
      borderBottom: "1px solid #efefef",
      fontSize: "0.9rem",
    },
    productImage: {
      width: "80px",
      height: "80px",
      objectFit: "cover",
      borderRadius: "4px",
      border: "1px solid #efefef",
    },
    actionButton: {
      padding: "0.4rem 0.8rem",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginRight: "0.5rem",
      fontSize: "0.85rem",
      fontWeight: "500",
    },
    priceText: {
      color: "#ee4d2d",
      fontWeight: "500",
    },
    productName: {
      color: "#222222",
      fontWeight: "400",
    },
    quantity: {
      color: "#666666",
    },
    error: {
      color: "#dc2626",
      fontSize: "0.875rem",
      marginTop: "0.25rem",
    },
    inputError: {
      borderColor: "#dc2626",
    },
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={{ fontSize: "1.25rem", fontWeight: "500" }}>
          Master Barang
        </h1>
        <Link to="/" style={styles.button}>
          Logout
        </Link>
      </div>
      <div style={styles.content}>
        {/* Form untuk Tambah Barang */}
        <Form method="post" style={{ marginBottom: "1.5rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <label>
              Nama Barang:
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                required
                style={{
                  display: "block",
                  width: "100%",
                  padding: "0.5rem",
                  marginTop: "0.5rem",
                  ...(errors.name && styles.inputError),
                }}
              />
            </label>
            {errors.name && <div style={styles.error}>{errors.name}</div>}
            {actionData?.errors?.name && (
              <div style={styles.error}>{actionData.errors.name}</div>
            )}
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label>
              URL Gambar:
              <input
                type="url"
                name="image"
                value={newProduct.image}
                onChange={handleInputChange}
                required
                style={{
                  display: "block",
                  width: "100%",
                  padding: "0.5rem",
                  marginTop: "0.5rem",
                  ...(errors.image && styles.inputError),
                }}
                placeholder="https://example.com/image.jpg"
              />
            </label>
            {errors.image && <div style={styles.error}>{errors.image}</div>}
            {actionData?.errors?.image && (
              <div style={styles.error}>{actionData.errors.image}</div>
            )}
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label>
              Jumlah:
              <input
                type="number"
                name="quantity"
                value={newProduct.quantity}
                onChange={handleInputChange}
                required
                min="1"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "0.5rem",
                  marginTop: "0.5rem",
                  ...(errors.quantity && styles.inputError),
                }}
              />
            </label>
            {errors.quantity && (
              <div style={styles.error}>{errors.quantity}</div>
            )}
            {actionData?.errors?.quantity && (
              <div style={styles.error}>{actionData.errors.quantity}</div>
            )}
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label>
              Harga:
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                required
                min="5000"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "0.5rem",
                  marginTop: "0.5rem",
                  ...(errors.price && styles.inputError),
                }}
              />
            </label>
            {errors.price && <div style={styles.error}>{errors.price}</div>}
            {actionData?.errors?.price && (
              <div style={styles.error}>{actionData.errors.price}</div>
            )}
          </div>
          <button
            type="submit"
            style={styles.addButton}
            onClick={(e) => {
              if (!validateForm()) {
                e.preventDefault();
              }
            }}
          >
            Tambahkan Barang
          </button>
        </Form>

        {/* Tabel Barang */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Gambar</th>
              <th style={styles.th}>Nama Barang</th>
              <th style={styles.th}>Qty</th>
              <th style={styles.th}>Harga</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={styles.productImage}
                  />
                </td>
                <td style={{ ...styles.td, ...styles.productName }}>
                  {product.name}
                </td>
                <td style={{ ...styles.td, ...styles.quantity }}>
                  {product.quantity}
                </td>
                <td style={{ ...styles.td, ...styles.priceText }}>
                  {formatPrice(product.price)}
                </td>
                <td style={styles.td}>
                  <div className="container" style={{ display: "flex" }}>
                    <Form method="put" action={`/admin/barang/${product.id}`}>
                      <button
                        type="submit"
                        style={{
                          ...styles.actionButton,
                          backgroundColor: "#1976d2",
                          color: "white",
                        }}
                      >
                        Edit
                      </button>
                    </Form>
                    <Form
                      method="delete"
                      action={`/admin/barang/${product.id}`}
                      style={{ display: "inline" }}
                    >
                      <button
                        type="submit"
                        style={{
                          ...styles.actionButton,
                          backgroundColor: "#ee4d2d",
                          color: "white",
                        }}
                      >
                        Delete
                      </button>
                    </Form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
