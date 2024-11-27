import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate, useFetcher, Form } from "react-router-dom";

export default function Cart() {
  const { cart, totalQty, totalPrice} = useLoaderData();
  const navigate = useNavigate();
  const fetcher = useFetcher();
    console.log(cart);
  const [updatedCart, setUpdatedCart] = useState(cart);

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
      fontSize: "24px",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: "5px 5px 0 0",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    th: {
      backgroundColor: "#f5f5f5",
      color: "#333",
      padding: "10px",
      textAlign: "center",
      border: "1px solid #ddd",
    },
    td: {
      padding: "10px",
      textAlign: "center",
      border: "1px solid #ddd",
    },
    image: {
      width: "80px",
      height: "80px",
      objectFit: "cover",
    },
    total: {
      marginTop: "20px",
      fontSize: "18px",
      fontWeight: "bold",
      textAlign: "right",
    },
    buttonCheckout: {
      backgroundColor: "#ee4d2d",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "20px",
      float: "right",
    },
    buttonDelete: {
      backgroundColor: "#ee4d2d",
      color: "white",
      border: "none",
      padding: "5px 10px",
      borderRadius: "3px",
      cursor: "pointer",
    },
  };

  const handleCheckout = (event) => {
    if (!window.confirm("Apakah Anda yakin ingin melakukan checkout?")) {
      event.preventDefault();
    }
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      alert("Jumlah harus lebih besar dari 0.");
      return;
    }

    // Update the cart immediately
    const updatedItems = updatedCart.map(item => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setUpdatedCart(updatedItems);

    // Submit the updated quantity to the server
    fetcher.submit(
      { 
        action: "updateQuantity", 
        id: id.toString(), 
        quantity: newQuantity.toString() 
      },
      { 
        method: "post",
        action: "/buyer/home/cart"
      }
    );
  };
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.success) {
      navigate("/buyer/home/cart", { replace: true });
    } else if (
      fetcher.state === "idle" &&
      fetcher.data &&
      !fetcher.data.success
    ) {
    }
  }, [fetcher.state, fetcher.data, navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span>Keranjang Belanja</span>
        <button onClick={() => navigate("/buyer/home")}>Home</button>
      </div>

      {updatedCart.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Keranjang belanja kosong
        </p>
      ) : (
        <>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Nama Barang</th>
                <th style={styles.th}>Gambar</th>
                <th style={styles.th}>Qty</th>
                <th style={styles.th}>Harga</th>
                <th style={styles.th}>Subtotal</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {updatedCart.map((item, index) => (
                <tr key={item.id}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>{item.name}</td>
                  <td style={styles.td}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={styles.image}
                    />
                  </td>
                  <td style={styles.td}>
                  <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      max={item.max_qty}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      style={{ width: "60px", textAlign: "center" }}
                    />
                  </td>
                  <td style={styles.td}>Rp {item.price.toLocaleString()}</td>
                  <td style={styles.td}>
                    Rp {(item.price * item.quantity).toLocaleString()}
                  </td>
                  <td style={styles.td}>
                    <fetcher.Form method="post" action="/buyer/home/cart">
                      <input type="hidden" name="action" value="delete" />
                      <input type="hidden" name="id" value={item.id} />
                      <button type="submit" style={styles.buttonDelete}>
                        Delete
                      </button>
                    </fetcher.Form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={styles.total}>
            <p>Total Qty: {totalQty}</p>
            <p>Total Harga: Rp {totalPrice.toLocaleString()}</p>
          </div>

          <Form method="post" action="/buyer/home/cart" onSubmit={handleCheckout}>
            <input type="hidden" name="action" value="checkout" />
            <button type="submit" style={styles.buttonCheckout}>
              Checkout
            </button>
          </Form>
        </>
      )}
    </div>
  );
}
