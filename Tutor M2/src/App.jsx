import { useState } from 'react'
import HomePage from './pages/HomePage'
import SecondPage from './pages/SecondPage'

function App() {

  //Akan ada 2 hal yang kita pelajari minggu ini, yaitu state dan event handling dalam react
  //1. State
  //State adalah "variabel" yang dapat mentrigger render ulang setiap ada perubahan data
  //deklarasi state memerlukan 2 hal, nama state dan fungsi untuk mengubah state (setter function)
  //kita bisa memakai hook useState dari React untuk membuat sebuah state
  //isi state bisa berupa tipe data apapun, misal string, number, array, object, dll
  const [route, setRoute] = useState("home")
  
  //perlu diperhatikan, state tidak bisa diubah secara langsung, sehingga untuk mengubah state, kita perlu memanggil fungsi yang sudah disediakan oleh useState (dalam hal ini setRoute)


  //2. Event Handling
  //untuk membuat event handler pada react, kita bisa melemparkan method ke dalam props sebuah component
  //contoh: <button onClick={ () => console.log("button clicked") }>Click Me</button>


  const handleNavbarClick = (page) => {
    //apabila kita memanggil function untuk mengubah state di dalam event handler, maka state akan berubah dan component akan dirender ulang pada state yang terbaru. Seperti contoh di bawah, setRoute("Ini halaman tidak dirender") tidak akan dirender
   setRoute("ini halaman tidak dirender")
   setRoute(page)
  }
  const handleAlert = () => {
    alert("hello")
  }

  return (
    <div className='w-screen h-screen'>
      <div className="header w-full h-16 bg-blue-900 flex">
        <div className="text-lg text-white m-auto x-3">

        {/* Ini adalah contoh event handling untuk onClick pada react. Kita bisa langsung passing method ke dalam onclick tersebut. */}
          <span className='mr-5 cursor-pointer' onClick={ () => {setRoute("home")} }>Home</span>
          <span className='cursor-pointer mr-5' onClick={ () => handleNavbarClick('second') }>Second</span>

          {/* apabila method tidak membutuhkan parameter, anda juga bisa mendeklarasikan sebagai berikut (tanpa arrow function) */}
          <span className='cursor-pointer' onClick={handleAlert}>Alert</span>
        </div>
      </div>
      <div className="content">
        {
          route=="home" && <HomePage />
        }
        {
          route=="second" && <SecondPage />
        }
      </div>
    </div>
  )
}

export default App
