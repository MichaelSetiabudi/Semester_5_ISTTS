import { useForm } from "react-hook-form";

//untuk menggunakan joi sebagai validator form, kita perlu import 2 hal ini
import Joi from "joi"
import { joiResolver } from "@hookform/resolvers/joi"
import convertDate from "./convertDate";

const ListBuku = (props) => {

  //untuk validasi form dengan joi, pertama kita harus membuat schema
  const schema = Joi.object({
    judul: Joi.string().required().messages({
      "string.empty":"Judul tidak boleh kosong"
    }),
    pengarang: Joi.string().required().valid("Jessica","Ivan","Febrian").messages({
      "any.only":"Pengarang harus valid!"
    }),
    stok: Joi.number().min(1).required().messages({
      "number.min": "Stok minimal {#limit} 1 buku",
    }),
    tanggal: Joi.date().required().messages({
      "date.base": "Tanggal harus diisi"
    }),
    penerbit: Joi.string().required().messages({
      "string.empty":"Penerbit harus diisi!"
    }),
  })

  /**
   * untuk form handling, kita bisa mengambil method dari useForm
  method register digunakan untuk meregistrasikan masing-masing input
  handlesubmit adalah method untuk menangkap event submit dari form
  reset adalah method untuk mereset form
  errors adalah object yang berisi error dari masing-masing input
  resolver digunakan untuk menghubungkan schema validasi joi dengan useForm
  **/
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: joiResolver(schema)
  });

  /** ini method yang akan dijalankan ketika form di submit
   * 
   * Method ini pasti mendapatkan 1 parameter dari useForm yaitu data dari form
   * data dari form ini berupa object
   * **/
  const addBook = data => {
    // console.log(data)
    const kode = props.books[props.books.length-1].kode + 1
    const newData = {
      kode,
      ...data
    }
    props.setBooks([...props.books,newData]) //untuk menambahkan data baru ke state books
    reset() //untuk reset form kembali seperti semula
  };

  const sellBook = (kode) => {
    const index = props.books.findIndex((book)=>book.kode === kode)

    if(props.books[index].stok >0){
      props.books[index].stok -= 1
      props.setBooks([...props.books])
    }
  }

  const deleteBook = (kode) =>{
    const index = props.books.findIndex((book)=>book.kode === kode)
    props.books.splice(index,1)
    props.setBooks([...props.books])
  }
  return (
    <>
      <h1>Tambah Buku</h1>

      {/* kita bisa memanggil method addBook melalui handleSubmit */}
      <form onSubmit={handleSubmit(addBook)}>

      {/* masing-masing input akan kita registerkan pada useForm */}
        <label>Judul Buku </label>
        <input type="text" {...register("judul")}/> <br /> 

        {/* ini untuk menampilkan pesan apabila ada error dari input user */}
        {errors.judul && <span style={{
          color:"red"
        }}>{errors.judul.message} <br /></span>}

        <label>Pengarang </label> <br />
        <input type="radio" name="type" value="Jessica" {...register("pengarang")} />Jessica <br />
        <input type="radio" name="type" value="Ivan" {...register("pengarang")}/>Ivan <br />
        <input type="radio" name="type" value="Febrian" {...register("pengarang")}/>Febrian <br />

        {errors.pengarang && <span style={{
          color:"red"
        }}>{errors.pengarang.message} <br /></span>}

      <label>Penerbit </label>
        <select {...register("penerbit")}>
          <option value="Gramedia">Gramedia</option>
          <option value="DisneyHyperion">DisneyHyperion</option>
          <option value="EpicReads">EpicReads</option>
        </select><br />
        {errors.penerbit && <span style={{
          color:"red"
        }}>{errors.penerbit.message} <br /></span>}

        <label>Jumlah Stok </label>
        <input type="number" {...register("stok")} /> <br />
        {errors.stok && <span style={{
          color:"red"
        }}>{errors.stok.message} <br /></span>}

        <label>Tanggal Tambah </label>
        <input type="date" {...register("tanggal")} /> <br />
        {errors.tanggal && <span style={{
          color:"red"
        }}>{errors.tanggal.message} <br /></span>}



        <button type="submit">Tambah</button>

      </form>
      <hr />
      <h1>List Buku</h1>
      <table border="1">
        <thead>
         <tr>
              <th>Kode</th>
              <th>Judul Buku</th>
              <th>Pengarang</th>
              <th>Penerbit</th>
              <th>Jumlah Stok</th>
              <th>Tanggal Ditambahkan</th>
              <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.books.map((book,index) => { 
            return (
              <tr key={book.kode}>
                <td>{book.kode}</td>
                <td>{book.judul}</td>
                <td>{book.pengarang}</td>
                <td>{book.penerbit}</td>
                <td>{book.stok}</td>
                <td>{convertDate(book.tanggal)}</td>
                <td>
                  <button onClick={()=>sellBook(book.kode)}>Sell</button>
                  <button onClick={()=>{
                    props.setIndex(index)
                    props.setRoute("edit")
                  }}>Edit</button>
                  <button onClick={()=>deleteBook(book.kode)}>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default ListBuku