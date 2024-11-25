import catalog from "./data.json";
import { redirect } from "react-router-dom";

/**
 * Fungsi loadCatalog dan getCatalog merupakan sebuah fungdi loader.
 * Fungsi loader digunakan untuk mendapatkan data pada halaman yang disetting.
 * Fungsi loader akan dijalankan sebelum element selesai dirender.
 * Loader juga dapat mengakses beberapa data melalui parameter fungsi.
 * Data yang dipassing pada parameter fungsi adalah context, params, dan request
 * Dengan akses request, loader mampu mengakses parameter pada URL seperti pada getCatalog
 */
const loadCatalog = () => {
  return catalog;
};

const getCatalog = (data) => {
  const { params } = data;
  return catalog.find((c) => c.id == params.id);
};

/**
 * formCatalogAction merupakan sebuah fungsi action yang akan ditarget saat melakukan submit.
 * Fungsi Action dapat menerima data yang isinya sama dengan loader yaitu context, params, dan request.
 * Karena action akan ditrigger saat sebuah action yang menarget URL tersebut ditargetkan,
 * kita dapat menghandle beberapa method request dengan satu fungsi saja.
 * Untuk mengakses data, kita perlu mengambil hasil formData dari request dengan akses data.request.formData()
 * Setelah mendapatkan formData, form tersebut perlu diubah menjadi object terlebih dahulu baru diproses.
 * Agar aplikasi berjalan dengan baik, lakukan redirection dengan return redirect menuju halaman yang diinginkan.
 */

const formCatalogAction = async (data) => {
  console.log(data);
  if (data.request.method == "POST") {
    const formData = await data.request.formData();
    const newItem = Object.fromEntries(formData);

    //berikan tambahan atribut agar data konsisten
    newItem.id = catalog.length + 1;
    newItem.image = "https://via.placeholder.com/150";

    console.log(newItem);
    catalog.push(newItem);

  } else if (data.request.method == "PUT") {
    const formData = await data.request.formData();
    const updatedData = Object.fromEntries(formData);
    const indexUpdated = catalog.findIndex(x => x.id == data.params.id)
    catalog[indexUpdated] = {...catalog[indexUpdated], ...updatedData}
  }
  
  return redirect("/items");
};

export default { loadCatalog, formCatalogAction, getCatalog };
