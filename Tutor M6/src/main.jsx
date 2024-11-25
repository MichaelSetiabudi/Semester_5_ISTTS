import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import ItemForm from "./ItemForm";
import Detail from "./Detail";
import List from "./List";
import Error from "./Error";
import dataHandler from './DataHandler';
import DummyErrorPage from "./DummyErrorPage";

/**
 * Pada materi minggu ini, kita akan belajar membuat router pada react.
 * Untuk membangun sebuah router, diperlukan sebuah library bernama react-router-dom
 * Untuk menginstall react-router-dom cukup mengikuti perintah berikut:
 * npm install react-router-dom
 */

/**
 * Untuk membuat router, gunakan method createBrowserRouter.
 * Methode createBrowserRouter akan menerima array RouteObject
 * Pada RouteObject terdapat beberapa atribut yang penting, antara lain:
 *
 * path: sebuah string lokasi url untuk mengakses elemen tertentu
 * element: sebuah JSX elemen yang akan ditampilkan pada path
 * errorElement: sebuah JSX elemen yang ditampilkan apabila ada error
 * children: anak route yang akan memiliki path gabungan antara path parent dan path anak
 * index: nilai boolean untuk menentukan path mana yang akan menjadi index
 */

const { loadCatalog, formCatalogAction, getCatalog } = dataHandler

const router = createBrowserRouter([
  {
    path: "/", //Akses melalui base_url
    element: <Home />,
    errorElement: <Error />,
    children: [
      {
        index:true,
        element: <div>Choose a menu</div>,
      },
      {
        path: "/about", //Akses melalui base_url/about
        element: <div>Tutor M6 tentang react-router-dom</div>,
      },
      {
        path: "/dummy", //coba throw error
        element: <DummyErrorPage/>,
      },
      {
        path: "/items", //Akses melalui base_url/items
        element: <List />,
        loader: loadCatalog,    // gunakan loader untuk mengakses data sebelum dilakukan render
        children: [
          {
            path: "new", //Akses melalui base_url/items/new
            action: formCatalogAction,
            element: <ItemForm />,
          },
          {
            path: ":id", //Akses melalui base_url/items/:id
            loader: getCatalog,
            element: <Detail />,
          },
          {
            path: ":id/edit", //Akses melalui base_url/items/:id/detail
            loader: getCatalog,
            action: formCatalogAction,
            element: <ItemForm />,
          },
        ],
      },
    ],
  },
]);

/**
 * Untuk mengaktifkan router, gunakan RouterProvider dari react-router-dom
 * berikan router pada properti router
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
