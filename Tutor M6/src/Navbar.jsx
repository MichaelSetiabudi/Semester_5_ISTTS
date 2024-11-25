import { Link, NavLink } from "react-router-dom";

/**
 * Untuk membuat navigasi, kita dapat menggunakan Link dan NavLink
 * Fungsi Link dan NavLink adalah memindahkan route active ke tujuan "to"
 * Link dan NavLink menghalau refresh server side seperti yang dilakukan <a>
 */

const Navbar = () => {
  return (
    <div className="border-b-2 border-gray-500">
      <Link className="px-2 py-1" to="/about">About</Link>
      <NavLink
        className={(state) => {
          return state.isActive ? "text-blue-400" : "text-black" + " px-2 py-1";
        }}
        to="/items"
      >Items</NavLink>

      {/**
       * Sebuah route yang mengarah ke route yang tidak terdaftar.
       */}
      <NavLink
        className={(state) => {
          return state.isActive ? "text-blue-400" : "text-black" + " px-2 py-1";
        }}
        to="/somewhereError"
      >Somewhere Error</NavLink>
    </div>
  );
};

export default Navbar;
