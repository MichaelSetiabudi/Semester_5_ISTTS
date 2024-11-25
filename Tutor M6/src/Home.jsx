import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

/**
 * Outlet merupakan sebuah slot yang akan diisi oleh elemen dari children route yang aktif.
 */

const Home = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Home;
