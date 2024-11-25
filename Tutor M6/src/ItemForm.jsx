import { Form, useFetcher, useLoaderData, useSubmit } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

/**
 * Untuk melakukan form handling dapat digunakan 2 cara yaitu:
 * 1. Menggunakan Form dari react-router-dom (tidak bisa menggunakan validasi)
 * 2. Menggunakan useSubmit dari react-router-dom + useForm dari react-hook-form
 */

const ItemForm = () => {
  //loader digunakan untuk mengambil data apabila melakukan edit
  const item = useLoaderData(); 

  //useFetcher digunakan untuk mengakses fetcher
  const fetcher = useFetcher();

  function submitForm(data) {
    // untuk mengirimkan data menggunakan fetcher
    // Masukkan data sebagai parameter pertama dan option pada parameter kedua
    // parameter yang sering digunakan adalah method dan action
    fetcher.submit(data, {
      method: "PUT",
      action: `/items/${item.id}/edit`,
    });
  }

  const validationSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().min(0),
    category: Joi.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(validationSchema),
    values: {
      name: item?.name,
      description: item?.description,
      category: item?.category,
      price: item?.price,
    }, 
    //masukkan data untuk default value pada register
    //!HATI-HATI: jangan memasukkan field yang tidak terdaftar pada validation
    //!AKIBAT: form akan error dan tidak dapat digunakan
  });

  return (
    <div>
      <div>{item == null ? "New Item" : "Edit Item"}</div>

      {/* Menggunakan form react-router-dom tanpa validasi*/}
      {!item && <Form action="/items/new" method="POST" className={formStyle}>
        <input {...inputProps("name")} />
        <input {...inputProps("description")} />
        <input {...inputProps("category")} />
        <input {...inputProps("price")} />
        <button type="submit" className={buttonStyle}>
          Submit
        </button>
      </Form>}

      {/* Menggunakan sistem react-hook-form dengan validasi */}
      {item && <form onSubmit={handleSubmit(submitForm)} className={formStyle}>
        <input {...inputProps("name")} {...register("name")} />
        <span>{errors.name?.message && errors.name.message}</span>

        <input {...inputProps("description")} {...register("description")} />
        <span>{errors.description?.message && errors.description.message}</span>

        <input {...inputProps("category")} {...register("category")} />
        <span>{errors.category?.message && errors.category.message}</span>

        <input {...inputProps("price")} {...register("price")} />
        <span>{errors.price?.message && errors.price.message}</span>

        <button type="submit" className={buttonStyle}>
          Submit
        </button>
      </form>}
    </div>
  );
};

/**
 * Disini Hanya bantuan untuk merapikan styling dan penulisan JSX
 */
const inputStyle = "border-2 border-gray-300 p-1";
const formStyle = "flex flex-col gap-y-2 w-1/2";
const buttonStyle = "border-2 border-gray-600 w-1/2 bg-white";
/**
 * Tips untuk menuliskan banyak property pada elemen agar lebih singkat
 * Cara pemanggilannya cukup dengan spread operator (Seperti register pada react-hook-form)
 */
const inputProps = (name) => {
  return {
    name: name,
    placeholder: name,
    type: "text",
    className: inputStyle,
  };
};

export default ItemForm;
