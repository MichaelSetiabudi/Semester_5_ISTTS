import { useState, useEffect, useCallback, useRef } from "react";
import logonavbar from "../assets/book.png";
import Library from "../components/Library";
import ForYou from "../components/ForYou";
import UserLibrary from "../components/UserLibrary";

// SearchBar Component with maintained focus
const SearchBar = ({ onSearch, placeholder = "Search by title or author", initialValue = "" }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [debouncedTerm, setDebouncedTerm] = useState(initialValue);
  const inputRef = useRef(null);

  useEffect(() => {
    setSearchTerm(initialValue);
    setDebouncedTerm(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedTerm !== null) {
      onSearch(debouncedTerm);
    }
  }, [debouncedTerm, onSearch]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <input
      ref={inputRef}
      className="form-control"
      style={{
        width: "90%",
        borderRadius: "8px",
        padding: "10px 15px",
        marginBottom: "1rem",
        border: "1px solid #ddd",
        fontSize: "1rem",
        transition: "border-color 0.2s ease",
      }}
      type="text"
      placeholder={placeholder}
      value={searchTerm}
      onChange={handleChange}
    />
  );
};

function LoginMenu({ userLoggedIn, setRoute }) {
  const user_id = userLoggedIn?.id;
  const [bookSearch, setBookSearch] = useState("");
  const [myBookSearch, setMyBookSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [userBooks, setUserBooks] = useState([]);
  const [activePage, setActivePage] = useState("home");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Reset search terms when changing pages
  const handlePageChange = (page) => {
    setActivePage(page);
    if (page !== "library") {
      setBookSearch("");
    }
    if (page !== "myLibrary") {
      setMyBookSearch("");
    }
  };

  // Memoized fetch functions using useCallback
  const fetchBooks = useCallback(async () => {
    if (!bookSearch && bookSearch !== '') return;
    
    setIsLoading(true);
    setError(null);
    try {
      const url = new URL('http://localhost:3000/api/books');
      if (bookSearch.trim()) {
        url.searchParams.append('search', bookSearch.trim());
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Failed to fetch books');
    } finally {
      setIsLoading(false);
    }
  }, [bookSearch]);

  const fetchUserBooks = useCallback(async () => {
    if (!user_id) return;
    if (!myBookSearch && myBookSearch !== '') return;
    
    setIsLoading(true);
    setError(null);
    try {
      const url = new URL(`http://localhost:3000/api/users/${user_id}/books`);
      if (myBookSearch.trim()) {
        url.searchParams.append('search', myBookSearch.trim());
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUserBooks(data);
    } catch (error) {
      console.error('Error fetching user books:', error);
      setError('Failed to fetch user books');
    } finally {
      setIsLoading(false);
    }
  }, [user_id, myBookSearch]);

  // Initial data fetch
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3000/api/books');
        if (!response.ok) throw new Error('Failed to fetch initial books');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error loading initial data:', error);
        setError('Failed to load initial books');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInitialData();
  }, []);

  // Fetch books when search changes
  useEffect(() => {
    if (bookSearch !== null) {
      fetchBooks();
    }
  }, [fetchBooks, bookSearch]);

  // Fetch user books when search changes
  useEffect(() => {
    if (user_id && myBookSearch !== null) {
      fetchUserBooks();
    }
  }, [fetchUserBooks, user_id, myBookSearch]);

  // Optimized sorting functions
  const getLastTwoBooks = useCallback((books) => {
    if (!books?.length) return [];
    return [...books]
      .sort((a, b) => new Date(b.last_read) - new Date(a.last_read))
      .slice(0, 2);
  }, []);

  const getRecentBooks = useCallback((books) => {
    if (!books?.length) return [];
    return [...books]
      .sort((a, b) => new Date(b.day_added) - new Date(a.day_added))
      .slice(0, 5);
  }, []);

  // Book operations
  const updateUserBookProgress = async (bookId, lastPages) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${user_id}/books/${bookId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ last_pages: lastPages }),
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const updatedBook = await response.json();
      setUserBooks(prevBooks => 
        prevBooks.map(book => book.id === bookId ? updatedBook : book)
      );
    } catch (error) {
      console.error('Error updating book progress:', error);
      setError('Failed to update book progress');
    }
  };

  const addBookToUserLibrary = async (bookData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${user_id}/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const newBook = await response.json();
      setUserBooks(prevBooks => [...prevBooks, newBook]);
    } catch (error) {
      console.error('Error adding book to library:', error);
      setError('Failed to add book to library');
    }
  };

  const lastTwoBooks = getLastTwoBooks(userBooks);
  const recentBooks = getRecentBooks(books);

  // Navigation component
  const Navigation = () => (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#F66B6B", padding: "1rem 1.5rem" }}>
      <div className="container-fluid d-flex align-items-center">
        <div className="navbar-brand d-flex align-items-center" style={{ color: "white", fontWeight: "bold" }}>
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
          {["home", "library", "myLibrary"].map((page) => (
            <a
              key={page}
              href="#"
              style={{
                color: "white",
                fontWeight: "bold",
                textDecoration: activePage === page ? "underline" : "none",
                marginRight: page !== "myLibrary" ? "3vw" : "0",
              }}
              onClick={() => handlePageChange(page)}
            >
              {page === "myLibrary" ? "My Library" : page.charAt(0).toUpperCase() + page.slice(1)}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );

  if (!userLoggedIn) {
    return <p>User tidak ada</p>;
  }

  return (
    <>
      <Navigation />
      <div className="container-fluid mt-4">
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
            onClick={() => setRoute("login")}
          >
            <h4>LOGOUT</h4>
          </button>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="text-center mt-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {activePage === "home" && (
              <>
                <div className="container-fluid p-0 m-0">
                  <h1 className="mt-4" style={{ paddingLeft: "3rem", fontWeight: "bold" }}>
                    List Book
                  </h1>
                </div>
                <div className="container-fluid" style={{ paddingLeft: "3rem", paddingRight: "3.5rem" }}>
                  {lastTwoBooks.length > 0 ? (
                    <div className="row">
                      {lastTwoBooks.map((book) => (
                        <Library
                          key={`last-book-${book.id}`}
                          imageUrl={book.image_url}
                          title={book.title}
                          author={book.author}
                          lastRead={book.last_read}
                          lastPage={book.last_pages}
                          totalPage={book.total_pages}
                          onUpdateProgress={updateUserBookProgress}
                          bookId={book.id}
                          userId={user_id}
                        />
                      ))}
                    </div>
                  ) : (
                    <p>Tidak ada buku yang ditemukan untuk pengguna ini</p>
                  )}
                </div>

                <div className="container-fluid p-0 m-0">
                  <h1 className="mt-4" style={{ paddingLeft: "3rem", fontWeight: "bold" }}>
                    For You
                  </h1>
                </div>
                <div className="container-fluid" style={{ paddingLeft: "3rem", paddingRight: "3.5rem" }}>
                  <div className="row">
                    {recentBooks.map((book) => (
                      <ForYou
                        key={`recent-book-${book.id}`}
                        imageUrl={book.image_url}
                        title={book.title}
                        author={book.author}
                        totalPage={book.total_pages}
                        bookData={book}
                        onAddBook={addBookToUserLibrary}
                        userId={user_id}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}

            {activePage === "library" && (
              <div className="container-fluid" style={{ marginTop: "3vh", marginLeft: "2vw" }}>
                <SearchBar 
                  onSearch={setBookSearch}
                  initialValue={bookSearch}
                  placeholder="Search by title or author"
                />
                <div className="row" style={{ width: "91%" }}>
                  {books.map((book) => (
                    <UserLibrary
                      key={`library-book-${book.id}`}
                      imageUrl={book.image_url}
                      title={book.title}
                      author={book.author}
                      totalPage={book.total_pages}
                      onAddBook={addBookToUserLibrary}
                      bookData={book}
                      userId={user_id}
                    />
                  ))}
                </div>
              </div>
            )}

            {activePage === "myLibrary" && (
              <div className="container-fluid" style={{ paddingLeft: "3rem", paddingRight: "3.5rem" }}>
                <SearchBar 
                  onSearch={setMyBookSearch}
                  initialValue={myBookSearch}
                  placeholder="Search by title or author"
                />
                {userBooks.length > 0 ? (
                  <div className="row">
                    {userBooks.map((book) => (
                      <Library
                        key={`my-library-${book.id}`}
                        imageUrl={book.image_url}
                        title={book.title}
                        author={book.author}
                        lastRead={book.last_read}
                        lastPage={book.last_pages}
                        totalPage={book.total_pages}
                        onUpdateProgress={updateUserBookProgress}
                        bookId={book.id}
                        userId={user_id}
                      />
                    ))}
                  </div>
                ) : (
                  <p>Tidak ada buku ditemukan untuk pengguna ini</p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default LoginMenu;