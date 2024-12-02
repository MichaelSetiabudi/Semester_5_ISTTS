import productsData from "../data/products.json";
import { redirect } from "react-router-dom";

let products = {
  products: [...productsData.products],
  cart: [], 
};


const validateProduct = (data) => {
  const errors = {};

  if (!data.name || data.name.trim() === "") {
    errors.name = "Nama barang harus diisi";
  }

  const quantity = Number(data.quantity);
  if (isNaN(quantity) || quantity < 1) {
    errors.quantity = "Quantity harus lebih dari atau sama dengan 1";
  }

  const price = Number(data.price);
  if (isNaN(price) || price < 5000) {
    errors.price = "Harga harus lebih dari atau sama dengan Rp 5.000";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

const loadProducts = () => {
  try {
    return products.products;
  } catch (error) {
    throw new Error("Gagal memuat data produk");
  }
};

const getProduct = (data) => {
  try {
    const { params } = data;
    const product = products.products.find(
      (product) => product.id == params.id
    );

    if (!product) {
      throw new Error("Produk tidak ditemukan");
    }

    return product;
  } catch (error) {
    throw new Error("Gagal memuat detail produk");
  }
};

const formProductAction = async (data) => {
  try {
    if (data.request.method === "POST") {
      const formData = await data.request.formData();
      const newProduct = Object.fromEntries(formData);

      const validation = validateProduct(newProduct);
      if (!validation.isValid) {
        return {
          success: false,
          errors: validation.errors,
        };
      }

      const processedProduct = {
        name: newProduct.name,
        image: newProduct.image,
        quantity: Number(newProduct.quantity),
        price: Number(newProduct.price),
        id: products.products.length + 1,
      };

      products.products.push(processedProduct);

      return redirect("/admin/barang");
    } else if (data.request.method === "PUT") {
      const formData = await data.request.formData();
      const updatedData = Object.fromEntries(formData);

      const validation = validateProduct(updatedData);
      if (!validation.isValid) {
        return { 
          success: false,
          errors: validation.errors 
        };
      }

      const productIndex = products.products.findIndex(
        (x) => x.id == data.params.id
      );

      if (productIndex === -1) {
        throw new Error("Produk tidak ditemukan");
      }

      const updatedProduct = {
        ...products.products[productIndex], 
        name: updatedData.name,
        quantity: Number(updatedData.quantity),
        price: Number(updatedData.price),
        image:updatedData.image,
        id: products.products[productIndex].id
      };

      products.products[productIndex] = updatedProduct;
      return redirect("/admin/barang");
    } else if (data.request.method === "DELETE") {
      const productId = data.params.id;
      const productIndex = products.products.findIndex(
        (x) => x.id == productId
      );
      if (productIndex === -1) {
        throw new Error("Produk tidak ditemukan");
      }
      products.products.splice(productIndex, 1);

      return redirect("/admin/barang");
    }

    return redirect("/admin/barang");
  } catch (error) {
    throw new Error("Gagal memproses data produk: " + error.message);
  }
};

const addToCartAction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const productId = formData.get('productId');
    const quantity = Number(formData.get('quantity'));
    const product = products.products.find(p => p.id == productId);

    if (!product) {
      return { 
        success: false, 
        error: "Produk tidak ditemukan" 
      };
    }

    if (quantity > product.quantity) {
      return {
        success: false,
        error: `Stok tidak mencukupi. Tersedia hanya ${product.quantity} barang.`
      };
    }
    const existingCartItem = products.cart.find(item => item.id == productId);

    if (existingCartItem) {
      const totalRequestedQuantity = existingCartItem.quantity + quantity;
      
      if (totalRequestedQuantity > product.quantity) {
        return {
          success: false,
          error: `Total pesanan melebihi stok. Tersedia hanya ${product.quantity} barang.`
        };
      }

      existingCartItem.quantity = totalRequestedQuantity;
    } else {
      products.cart.push({
        id: product.id,
        name: product.name,
        quantity: quantity,
        price: product.price,
        image: product.image
      });
    }

    return { 
      success: true, 
      cart: products.cart 
    };
  } catch (error) {
    return {
      success: false,
      error: "Gagal menambahkan produk ke keranjang: " + error.message
    };
  }
};

const loadCart = () => {
  try {
    const cart = products.cart.map(item => {
      const product = products.products.find(product => product.id === item.id);
      return {
        ...item,
        max_qty: product ? product.quantity : 0 
      };
    });
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return {
      cart,
      totalQty,
      totalPrice
    };
  } catch (error) {
    throw new Error("Gagal memuat data keranjang");
  }
};



const checkoutAction = async ({ formData }) => {
  try {
    const cart = products.cart;

    if (cart.length === 0) {
      return {
        success: false,
        error: "Keranjang belanja kosong",
      };
    }

    for (const cartItem of cart) {
      const product = products.products.find((p) => p.id === cartItem.id);

      if (!product) {
        return {
          success: false,
          error: `Produk dengan ID ${cartItem.id} tidak ditemukan`,
        };
      }

      if (cartItem.quantity > product.quantity) {
        return {
          success: false,
          error: `Stok ${product.name} tidak mencukupi. Tersedia: ${product.quantity}`,
        };
      }

      product.quantity -= cartItem.quantity;
    }

    products.cart = []; 
    return redirect("/buyer/home");
  } catch (error) {
    return {
      success: false,
      error: "Gagal melakukan checkout: " + error.message,
    };
  }
};

const updateCartItemQuantity = async (data) => {
  try {
    const { id, quantity } = data;
    const product = products.products.find((p) => p.id === parseInt(id));
    
    if (!product) {
      return { success: false, error: "Produk tidak ditemukan" };
    }

    if (quantity > product.quantity) {
      return { success: false, error: "Stok tidak mencukupi" };
    }

    const cartItem = products.cart.find((item) => item.id === parseInt(id));
    
    if (cartItem) {
      cartItem.quantity = quantity;
    }

    return { success: true, cart: products.cart };
  } catch (error) {
    return {
      success: false,
      error: "Gagal memperbarui jumlah produk di keranjang: " + error.message,
    };
  }
};


const deleteCartItemAction = async ({ formData }) => {
  try {
    const cartItemId = formData.get("id");

    console.log("ID yang diterima untuk dihapus:", cartItemId);

    const itemIndex = products.cart.findIndex((item) => item.id == cartItemId);
    if (itemIndex === -1) {
      console.error("Item tidak ditemukan di keranjang");
      return {
        success: false,
        error: "Item tidak ditemukan di keranjang",
      };
    }

    products.cart.splice(itemIndex, 1);

    console.log("Keranjang setelah penghapusan:", products.cart);
    return redirect("/buyer/home/cart");
  } catch (error) {
    console.error("Error saat menghapus item dari keranjang:", error);
    return {
      success: false,
      error: "Gagal menghapus item dari keranjang: " + error.message,
    };
  }
};


const cartAction = async ({ request }) => {
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "checkout") {
    return checkoutAction({ request, formData });
  } else if (action === "delete") {
    return deleteCartItemAction({ formData });
  } else if (action === "updateQuantity") {
    const id = formData.get("id");
    const quantity = parseInt(formData.get("quantity"));
    
    return updateCartItemQuantity({ id, quantity });
  }

  return {
    success: false,
    error: "Aksi tidak valid",
  };
};







export default { loadProducts, formProductAction, getProduct,addToCartAction,loadCart,cartAction};
