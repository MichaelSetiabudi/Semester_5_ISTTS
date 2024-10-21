import { useState } from "react"
import { useForm } from "react-hook-form";
const EditBuku = (props) => {
  //validasi pakai function bawaan dari react hook form 
  const [tempBook, setTempBook] = useState(props.books[props.index])
  const { register, handleSubmit, reset,formState: { errors } } = useForm();
  

  const editBook = data => {
    const editData = {
      ...data,
      kode : tempBook.kode,
      tanggal : tempBook.tanggal,
      stok : parseInt(tempBook.stok) + parseInt(data.stok)
    }
    props.books[props.index] = editData
    props.setBooks([...props.books]) 
    reset() 
    
    props.setRoute("list")
  };


  //cara ini bisa untuk isi default value sekaligus form validation
  register("judul",{
    value:tempBook.judul,
    required:{ 
      value: true,
      message: 'Harus diisi'
    }
  })

  register("stok",{
    min:{
      value:0,
      message: "Tidak boleh kurang dari 0"
    },
  })

  return (
    <>  
      <h1>Edit Buku</h1>
      <button onClick={()=>props.setRoute("list")}>Back</button>
      <br/><br/>
      <form onSubmit={handleSubmit(editBook)}>

      {/* masing-masing input akan kita registerkan pada useForm */}
        <label>Judul Buku </label>
        <input type="text" name="judul" {...register("judul")}/> <br /> 
        {errors.judul && <span style={{
          color:"red"
        }}>{errors.judul.message} <br /></span>}

        <label>Pengarang </label> <br />
        <input type="radio" name="type" value="Jessica" {...register("pengarang")} defaultChecked={tempBook.pengarang=="Jessica"}/>Jessica <br />
        <input type="radio" name="type" value="Ivan" {...register("pengarang")} defaultChecked={tempBook.pengarang=="Ivan"}/>Ivan <br />
        <input type="radio" name="type" value="Febrian" {...register("pengarang")} defaultChecked={tempBook.pengarang=="Febrian"}/>Febrian <br />
        {errors.pengarang && <span style={{
          color:"red"
        }}>{errors.pengarang.message} <br /></span>}

        
        <label>Penerbit </label>
        <select {...register("penerbit")} defaultValue={tempBook.penerbit}>
          <option value="Gramedia">Gramedia</option>
          <option value="DisneyHyperion">DisneyHyperion</option>
          <option value="EpicReads">EpicReads</option>
        </select><br />
        {errors.penerbit && <span style={{
          color:"red"
        }}>{errors.penerbit.message} <br /></span>}

        <label>Tambah Mutasi Stok </label>
        <input type="number" {...register("stok")} defaultValue={0} /> <br />
        {errors.stok && <span style={{
          color:"red"
        }}>{errors.stok.message} <br /></span>}

        <button type="submit">Edit</button>

      </form>
    </>
    
  )
}

export default EditBuku