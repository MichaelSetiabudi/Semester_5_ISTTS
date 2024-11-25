import products from "../data/products.json";
import { redirect } from "react-router-dom";

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
        return { errors: validation.errors };
      }
      newProduct.image = newProduct.image;
      newProduct.quantity = Number(newProduct.quantity);
      newProduct.price = Number(newProduct.price);
      newProduct.id = products.products.length + 1;
      products.products.push(newProduct);

      return { success: true, message: "Produk berhasil ditambahkan" };
    } else if (data.request.method === "PUT") {
      const formData = await data.request.formData();
      const updatedData = Object.fromEntries(formData);

      // Validate the updated data
      const validation = validateProduct(updatedData);
      if (!validation.isValid) {
        return { errors: validation.errors };
      }

      updatedData.quantity = Number(updatedData.quantity);
      updatedData.price = Number(updatedData.price);

      const indexUpdated = products.products.findIndex(
        (x) => x.id == data.params.id
      );
      if (indexUpdated === -1) {
        throw new Error("Produk tidak ditemukan");
      }

      products.products[indexUpdated] = {
        ...products.products[indexUpdated],
        ...updatedData,
        id: products.products[indexUpdated].id,
        image: products.products[indexUpdated].image,
      };

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
    throw new Error("Gagal memproses data produk");
  }
};

export default { loadProducts, formProductAction, getProduct };
