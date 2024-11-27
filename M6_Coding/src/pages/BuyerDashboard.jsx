import React, { useState } from "react";
import {
  useLoaderData,
  Link,
  Form,
  useActionData,
  useNavigation,
  useNavigate,
  Outlet
} from "react-router-dom";

export default function BuyerDashboard() {
  const products = useLoaderData() || [];
  const actionData = useActionData();
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [cart, setCart] = useState([]);
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = products.slice(startIndex, startIndex + itemsPerPage);

  const styles = {
    container: {
      fontFamily: "'Arial', sans-serif",
      width: "100%",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#fff7e6",
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
    headerTitle: {
      fontSize: "1.5rem",
    },
    button: {
      padding: "10px 15px",
      backgroundColor: "white",
      color: "#ee4d2d",
      border: "2px solid white",
      borderRadius: "4px",
      cursor: "pointer",
      marginLeft: "10px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "2rem",
    },
    th: {
      backgroundColor: "#fef4e8",
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
      width: "80px",
      height: "80px",
      objectFit: "cover",
      borderRadius: "4px",
      border: "1px solid #ddd",
    },
    input: {
      width: "50px",
      padding: "5px",
      textAlign: "center",
      border: "1px solid #ddd",
      borderRadius: "4px",
    },
    addToCartButton: {
      padding: "6px 12px",
      backgroundColor: "#ee4d2d",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    pagination: {
      display: "flex",
      justifyContent: "center",
      marginTop: "20px",
    },
    pageButton: {
      padding: "8px 12px",
      margin: "0 5px",
      backgroundColor: "#fff7e6",
      border: "1px solid #ee4d2d",
      borderRadius: "4px",
      cursor: "pointer",
    },
    activePageButton: {
      backgroundColor: "#ee4d2d",
      color: "white",
    },
    mainContent: {
      position: "relative",
    }
  };

  React.useEffect(() => {
    if (actionData?.success && actionData?.cart) {
      setCart(actionData.cart);
    }
  }, [actionData]);

  const handleAddToCart = async (event, productId) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(`/buyer/home/cart/add/${productId}`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setCart(result.cart);
        setCartError(null);
      } else {
        setCartError(result.error || "Gagal menambahkan ke keranjang");
      }
    } catch (error) {
      setCartError("Gagal menambahkan ke keranjang");
      console.error(error);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const goToPage = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Welcome, Buyer</h1>
        <div>
          <button
            style={styles.button}
            onClick={() => navigate("/buyer/home/cart")}
          >
            Cart
          </button>
          <button style={styles.button} onClick={() => navigate("/")}>
            Logout
          </button>
        </div>
      </div>

      <div style={styles.mainContent}>
        <Outlet />
      </div>

      {actionData?.error && (
        <div
          style={{
            backgroundColor: "#ffebee",
            color: "#c62828",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ef9a9a",
          }}
        >
          {actionData.error}
        </div>
      )}

      <h2>Barang</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Nama Barang</th>
            <th style={styles.th}>Gambar</th>
            <th style={styles.th}>Qty</th>
            <th style={styles.th}>Harga</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems && currentItems.length > 0 ? (
            currentItems.map((product, index) => (
              <tr key={product.id}>
                <td style={styles.td}>{startIndex + index + 1}</td>
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
                  <Form method="post" style={{ display: "flex", gap: "8px" }}>
                    <input type="hidden" name="productId" value={product.id} />
                    <input
                      type="number"
                      name="quantity"
                      defaultValue="1"
                      min="1"
                      max={product.quantity}
                      style={styles.input}
                    />
                    <button
                      type="submit"
                      style={styles.addToCartButton}
                      disabled={navigation.state === "submitting"}
                    >
                      {navigation.state === "submitting"
                        ? "Menambahkan..."
                        : "Add to Cart"}
                    </button>
                  </Form>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={styles.td}>
                Data barang tidak tersedia.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={styles.pagination}>
        <button
          onClick={() => goToPage(currentPage - 1)}
          style={styles.pageButton}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            style={{
              ...styles.pageButton,
              ...(currentPage === i + 1 && styles.activePageButton),
            }}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => goToPage(currentPage + 1)}
          style={styles.pageButton}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}