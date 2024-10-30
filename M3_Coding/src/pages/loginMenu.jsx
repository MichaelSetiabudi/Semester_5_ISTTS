import logonavbar from "../assets/book.png";
import Library from "../components/Library";
import ForYou from "../components/ForYou";
import { useState } from "react";

function LoginMenu({
  userLoggedIn,
  users,
  setUsers,
  setRoute,
  books,
  setUsersBook,
  usersBook,
}) {
  const user_id = userLoggedIn.id;
  const [bookSearch, setBookSearch] = useState("");

  const getLastTwoBooks = (books) => {
    if (!books || books.length === 0) return [];
    const sortedBooks = [...books].sort(
      (a, b) => new Date(b.last_read) - new Date(a.last_read)
    );
    return sortedBooks.slice(0, 2);
  };

  const getRecentBooks = (books) => {
    if (!books || books.length === 0) return [];
    const sortedBooks = [...books].sort(
      (a, b) => new Date(b.day_added) - new Date(a.day_added)
    );
    return sortedBooks.slice(0, 5);
  };

  const lastTwoBooks = getLastTwoBooks(usersBook[user_id]);
  const recentBooks = getRecentBooks(books);
  const [activePage, setActivePage] = useState("home");

  const filteredBooks = bookSearch
    ? books.filter(
        (book) =>
          book.title.toLowerCase().includes(bookSearch.toLowerCase()) ||
          book.author.toLowerCase().includes(bookSearch.toLowerCase())
      )
    : books;

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
          <a
            className="navbar-brand d-flex align-items-center"
            href="#"
            style={{ color: "white", fontWeight: "bold" }}
          >
            <img
              src={logonavbar}
              alt="Logo"
              width="80"
              height="auto"
              className="d-inline-block align-text-top m-0 p-0"
            />
            <span style={{ fontSize: "calc(12px + 1vw)", marginRight: "3vw" }}>
              LKOMP LIBRARY
            </span>
            <a
              href="#"
              style={{
                color: "white",
                fontWeight: "bold",
                textDecoration: activePage === "home" ? "underline" : "none",
                marginRight: "3vw",
              }}
              onClick={() => setActivePage("home")}
            >
              Home
            </a>
            <a
              href="#"
              style={{
                color: "white",
                fontWeight: "bold",
                textDecoration: activePage === "library" ? "underline" : "none",
                marginRight: "3vw",
              }}
              onClick={() => setActivePage("library")}
            >
              Library
            </a>
            <a
              href="#"
              style={{
                color: "white",
                fontWeight: "bold",
                textDecoration: activePage === "addUser" ? "underline" : "none",
              }}
              onClick={() => setActivePage("addUser")}
            >
              Add User
            </a>
          </a>
        </div>
      </nav>

      <div className="container-fluid mt-4">
        {userLoggedIn ? (
          <>
            <div className="d-flex justify-content-between align-items-center">
              <h1 style={{ fontWeight: "700", marginLeft: "2.5vw" }}>
                {userLoggedIn.username}#{user_id}
              </h1>
              <button
                className="btn btn-danger"
                style={{
                  borderRadius: "10px",
                  padding: "1vh 1vw",
                  marginRight: "2.5vw",
                }}
                onClick={() => {
                  setRoute("login");
                }}
              >
                <h4>LOGOUT</h4>
              </button>
            </div>

            {activePage === "home" && (
              <>
                <div className="container-fluid p-0 m-0">
                  <h1
                    className="mt-4"
                    style={{ paddingLeft: "3rem", fontWeight: "bold" }}
                  >
                    List Book
                  </h1>
                </div>

                <div
                  className="container-fluid"
                  style={{ paddingLeft: "3rem", paddingRight: "3.5rem" }}
                >
                  {lastTwoBooks && lastTwoBooks.length > 0 ? (
                    <div className="row">
                      {lastTwoBooks.map((book) => (
                        <Library
                          key={book.id}
                          imageUrl={book.image_url}
                          title={book.title}
                          author={book.author}
                          lastRead={book.last_read}
                          lastPage={book.last_pages}
                          totalPage={book.total_pages}
                          setUsersBook={setUsersBook}
                          usersBook={usersBook}
                          user_id={user_id}
                        />
                      ))}
                    </div>
                  ) : (
                    <p>Tidak ada buku yang ditemukan untuk pengguna ini</p>
                  )}
                </div>

                <div className="container-fluid p-0 m-0">
                  <h1
                    className="mt-4"
                    style={{ paddingLeft: "3rem", fontWeight: "bold" }}
                  >
                    For You
                  </h1>
                </div>

                <div
                  className="container-fluid"
                  style={{ paddingLeft: "3rem", paddingRight: "3.5rem" }}
                >
                  <div className="row">
                    {recentBooks.map((book) => (
                      <ForYou
                        key={book.id}
                        imageUrl={book.image_url}
                        title={book.title}
                        author={book.author}
                        totalPage={book.total_pages}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}

            {activePage === "library" && (
              <>
                <div className="container-fluid" style={{marginTop:"3vh", marginLeft:"2vw"}}>
                  <input
                    style={{
                      width: "90%",
                      borderRadius: "8px",
                      height: "3vh",
                      padding: "5px",
                      marginBottom: "1rem",
                    }}
                    type="text"
                    placeholder="Search by title or author"
                    value={bookSearch}
                    onChange={(e) => setBookSearch(e.target.value)}
                  />
                  <div className="row" style={{width:"91%"}}>
                    {filteredBooks.map((book) => (
                      <ForYou
                        key={book.id}
                        imageUrl={book.image_url}
                        title={book.title}
                        author={book.author}
                        totalPage={book.total_pages}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <p>User tidak ada</p>
        )}
      </div>
    </>
  );
}

export default LoginMenu;
