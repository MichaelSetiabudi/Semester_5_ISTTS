/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import logonavbar from "../assets/book.png";
import Library from "../components/adminLibrary";
import ListUser from "../components/listUser";
import AddBooks from "../components/addBooks";
import AddUsers from "../components/addUsers";

// eslint-disable-next-line react/prop-types
function AdminMenu({ books = [], setBooks, users = [], setUsers ,setRoute}) {

  const [bookSearch, setBookSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [activePage, setActivePage] = useState("home");

  const filteredBooks = books.filter(
    (book) =>
      book.title?.toLowerCase().includes(bookSearch.toLowerCase()) ||
      book.author?.toLowerCase().includes(bookSearch.toLowerCase())
  );

  const filteredUsers = users.filter(
    (user) =>
      user.username?.toLowerCase().includes(userSearch.toLowerCase()) ||
      user.email?.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{
          backgroundColor: "#F66B6B",
          padding: "1rem 1.5rem",
        }}
      >
        <div className="container-fluid d-flex align-items-center">
          <a className="navbar-brand d-flex align-items-center" href="#" style={{ color: "white", fontWeight: "bold" }}>
            <img
              src={logonavbar}
              alt="Logo"
              width="50"
              height="auto"
              className="d-inline-block align-text-top m-0 p-0"
            />
            <span style={{ fontSize: "calc(12px + 1vw)", marginLeft: "0.5rem", marginRight: "3vw" }}>
              LKOMP LIBRARY
            </span>
            <a href="#" style={{ color: "white", fontWeight: "bold", textDecoration: activePage === "home" ? "underline" : "none", marginRight: "3vw" }} onClick={() => setActivePage("home")}>
              Home
            </a>
            <a href="#" style={{ color: "white", fontWeight: "bold", textDecoration: activePage === "addBooks" ? "underline" : "none", marginRight: "3vw" }} onClick={() => setActivePage("addBooks")}>
              Add Book
            </a>
            <a href="#" style={{ color: "white", fontWeight: "bold", textDecoration: activePage === "addUser" ? "underline" : "none" }} onClick={() => setActivePage("addUser")}>
              Add User
            </a>
          </a>
        </div>
      </nav>

      <div className="container-fluid mt-4" style={{ overflowX: "hidden" }}>
        {activePage === "home" ? (
          <>
            <div className="d-flex justify-content-between align-items-center">
              <h1 style={{ fontWeight: "700", marginLeft: "1vw" }}>Admin</h1>
              <button
                className="btn btn-danger"
                style={{
                  borderRadius: "10px",
                  padding: "1vh 1vw",
                  marginRight: "1vw",
                }}
                onClick={()=>{setRoute("login")}}
              >
                <h4>LOGOUT</h4>
              </button>
            </div>
            <div className="container-fluid" >
              <div className="justify-content-between align-items-center mt-4 mb-4" style={{marginLeft:"1vw"}}>
                <h1 style={{ fontWeight: "700" }}>List Book</h1>
                <input
                  style={{
                    width: "92%",
                    borderRadius: "8px",
                    height: "3vh",
                    padding: "5px",
                  }}
                  type="text"
                  placeholder="Search by title or author"
                  value={bookSearch}
                  onChange={(e) => setBookSearch(e.target.value)}
                />
              </div>
              <div className="row" style={{width:"92%",marginLeft:"1vw"}}>
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <Library
                      key={book.id}
                      imageUrl={book.image_url}
                      title={book.title}
                      author={book.author}
                      totalPage={book.total_pages}
                      onDelete={() => {
                        setBooks(books.filter((b) => b.id !== book.id));
                      }}
                    />
                  ))
                ) : (
                  <p>Tidak ditemukan buku</p>
                )}
              </div>
            </div>
            <div className="container-fluid">
              <div className="justify-content-between align-items-center mt-4 mb-3"style={{marginLeft:"1vw"}}>
                <h1 style={{ fontWeight: "700" }}>List User</h1>
                <input
                  style={{
                    width: "92%",
                    borderRadius: "8px",
                    height: "3vh",
                    padding: "5px",
                  }}
                  type="text"
                  placeholder="Search by name or email"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                />
              </div>
              <div className="row" style={{width:"92%",marginLeft:"1vw"}}>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((u) => (
                    <ListUser
                      key={u.id}
                      username={u.username}
                      email={u.email}
                      join_at={u.join_at}
                      onDelete={() => {
                        setUsers(users.filter((user) => user.id !== u.id)); 
                      }}
                    />
                  ))
                ) : (
                  <p>Tidak ditemukan user</p>
                )}
              </div>
            </div>
          </>
        ) : activePage === "addBooks" ? (
          <AddBooks books={books} setBooks={setBooks} setActivePage={setActivePage} />
        ) : activePage === "addUser" ? (
          <AddUsers users={users} setUsers={setUsers} setActivePage={setActivePage} />
        ) : null}
      </div>
    </>
  );
}

export default AdminMenu;
