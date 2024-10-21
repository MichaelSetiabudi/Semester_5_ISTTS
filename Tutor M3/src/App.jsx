import { useState } from "react"
import ListBuku from "./ListBuku"
import EditBuku from "./EditBuku"

function App() {

  /**
   * Pada tutor kali ini kita akan membahas mengenai form handling menggunakan library react-hook-form
   * Dokumentasi lihat di https://react-hook-form.com/get-started
   * 
   * Secara sederhana, ini app untuk manajemen data buku. Ada 3 bagian yaitu tambah, edit, dan list buku
   * Form tambah buku akan divalidasi dengan bantuan Joi
   * Untuk form edit akan divalidasi menggunakan default function dari react-hook-form 
   */
  const [route,setRoute] = useState("list")
  const [index, setIndex] = useState(0) //ini untuk menampung data index buku yang akan diedit
  const [books, setBooks] = useState([
    {
      kode: 1, 
      judul: 'Buku 1',
      pengarang : "Jessica",
      stok : 2,
      tanggal: new Date(),
      penerbit: "Gramedia"
    },
    {
      kode: 2, 
      judul: 'Buku 2',
      pengarang : "Ivan",
      stok : 17,
      tanggal: new Date(),
      penerbit: "Gramedia"
    },
    {
      kode: 3, 
      judul: 'Buku 3',
      pengarang : "Febrian",
      stok : 5,
      tanggal: new Date(),
      penerbit: "Gramedia"
    }
  ]) //ini untuk data list buku yang akan ditampilkan

    
  return (
    <>
      {/* kita passingkan setRoute supaya dapat mentrigger pindah halaman dari komponen */}
      {route === "list" && <ListBuku books={books} index={index} setIndex={setIndex} setRoute={setRoute} setBooks={setBooks}/>}
      {route === "edit" && <EditBuku books={books} index={index} setRoute={setRoute} setBooks={setBooks}/>}
    </>
  )
}

export default App
