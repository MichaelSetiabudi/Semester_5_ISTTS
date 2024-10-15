import datajson from "./assets/data.json";
import logonavbar from "./assets/book.png";
import Library from "./components/Library";
import ForYou from "./components/ForYou";

function App() {
  const user_id = "0001";
  const userData = datajson.find((user) => user.user.id === user_id);

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
            <span style={{ fontSize: "calc(12px + 1vw)" }}>LKOMP LIBRARY</span>
          </a>
        </div>
      </nav>

      <div className="container-fluid mt-4">
        {userData ? (
          <>
            <div className="container-fluid p-0 m-0">
              <h1
                className="mb-4"
                style={{ paddingLeft: "3rem", fontWeight: "bold" }}
              >
                {userData.user.name} #{userData.user.id}
              </h1>
            </div>
            <div
              className="container-fluid"
              style={{ paddingLeft: "3rem", paddingRight: "3.5rem" }}
            >
              <div className="container-fluid p-0 m-0">
                {userData.library && userData.library.length > 0 ? (
                  <div className="row">
                    {userData.library.map((book) => (
                      <Library
                        key={book.id}
                        imageUrl={book.image_url}
                        title={book.title}
                        author={book.author}
                        lastRead={book.last_read}
                        lastPage={book.last_pages}
                        totalPage={book.total_pages}
                      />
                    ))}
                  </div>
                ) : (
                  <p>Tidak ditemukan buku</p>
                )}
              </div>
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
              className="containet-fluid"
              style={{ paddingLeft: "3rem", paddingRight: "3.5rem" }}
            >
              {userData.suggestion &&
              userData.suggestion.length > 0 ? (
                <div className="row">
                  {userData.suggestion.map((recBook, index) => (
                    console.log(recBook),
                    <ForYou
                      key={index}
                      imageUrl={recBook.image_url}
                      title={recBook.title}
                      author={recBook.author}
                      totalPage={recBook.pages}
                    />
                  ))}
                </div>
              ) : (
                <p>tidak ada buku rekomendasi untuk anda</p>
              )}
            </div>
          </>
        ) : (
          <p>user tidak ada</p>
        )}
      </div>
    </>
  );
}

export default App;
