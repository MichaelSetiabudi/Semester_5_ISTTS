// loaders/productLoader.js
import productsData from "../data/products.json";
import { redirect } from "react-router-dom";

// Create a memory copy of products that will be used during runtime
let products = {
  products: [...productsData.products],
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

      // Prepare new product data
      const processedProduct = {
        name: newProduct.name,
        image: newProduct.image,
        quantity: Number(newProduct.quantity),
        price: Number(newProduct.price),
        id: products.products.length + 1,
      };

      // Add new product to memory
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

      // Find product index
      const productIndex = products.products.findIndex(
        (x) => x.id == data.params.id
      );

      if (productIndex === -1) {
        throw new Error("Produk tidak ditemukan");
      }

      // Update product in memory dengan menyimpan semua data yang ada
      const updatedProduct = {
        ...products.products[productIndex], // Preserve existing data
        name: updatedData.name,
        quantity: Number(updatedData.quantity),
        price: Number(updatedData.price),
        image:updatedData.image,
        // Pastikan ID tetap sama
        id: products.products[productIndex].id
      };

      // Replace product lama dengan yang baru
      products.products[productIndex] = updatedProduct;

      // Ensure the page fetches the updated products list on redirect
      return redirect("/admin/barang");
    } else if (data.request.method === "DELETE") {
      const productId = data.params.id;
      const productIndex = products.products.findIndex(
        (x) => x.id == productId
      );

      if (productIndex === -1) {
        throw new Error("Produk tidak ditemukan");
      }

      // Remove product from memory
      products.products.splice(productIndex, 1);

      return redirect("/admin/barang");
    }

    return redirect("/admin/barang");
  } catch (error) {
    throw new Error("Gagal memproses data produk: " + error.message);
  }
};

export default { loadProducts, formProductAction, getProduct };
