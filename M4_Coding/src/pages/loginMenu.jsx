import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import logonavbar from "../assets/book.png";
import Library from "../components/Library";
import ForYou from "../components/ForYou";
import UserLibrary from "../components/UserLibrary";

const API_BASE_URL = 'http://localhost:3001/api';
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

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
    }, 300);

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

  const handlePageChange = (page) => {
    setActivePage(page);
    if (page !== "library") {
      setBookSearch("");
    }
    if (page !== "myLibrary") {
      setMyBookSearch("");
    }
    if (page === "myLibrary" || page === "home") {
      fetchUserBooks();
    }
  };

  const fetchBooks = useCallback(async () => {
    if (!bookSearch && bookSearch !== '') return;
    
    setIsLoading(true);
    setError(null);
    try {
      const params = bookSearch.trim() ? { search: bookSearch.trim() } : {};
      const response = await axiosInstance.get('/books', { params });
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError(error.response?.data?.message || 'Failed to fetch books');
    } finally {
      setIsLoading(false);
    }
  }, [bookSearch]);

  const fetchUserBooks = useCallback(async () => {
    if (!user_id) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const params = myBookSearch?.trim() ? { search: myBookSearch.trim() } : {};
      const response = await axiosInstance.get(`/users/${user_id}/books`, { params });
      setUserBooks(response.data);
    } catch (error) {
      console.error('Error fetching user books:', error);
      setError(error.response?.data?.message || 'Failed to fetch user books');
    } finally {
      setIsLoading(false);
    }
  }, [user_id, myBookSearch]);

  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        const promises = [axiosInstance.get('/books')];
        if (user_id) {
          promises.push(axiosInstance.get(`/users/${user_id}/books`));
        }
        
        const [booksResponse, userBooksResponse] = await Promise.all(promises);
        setBooks(booksResponse.data);
        
        if (userBooksResponse) {
          setUserBooks(userBooksResponse.data);
        }
      } catch (error) {
        console.error('Error loading initial data:', error);
        setError(error.response?.data?.message || 'Failed to load initial data');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInitialData();
  }, [user_id]);

  useEffect(() => {
    if (bookSearch !== null) {
      fetchBooks();
    }
  }, [fetchBooks, bookSearch]);

  useEffect(() => {
    if (user_id && myBookSearch !== null) {
      fetchUserBooks();
    }
  }, [fetchUserBooks, user_id, myBookSearch]);

  const getLastTwoBooks = (books) => {
    if (!books?.length) return [];
    
    const today = new Date();
    const booksWithDateDiff = books.map(book => {
      const [day, month, year] = book.last_read.split('/');
      const lastReadDate = new Date(year, month - 1, day); 
      
      return {
        ...book,
        dateDifference: Math.abs(today - lastReadDate)
      };
    });
    return booksWithDateDiff
      .sort((a, b) => a.dateDifference - b.dateDifference)
      .slice(0, 2)
      .map(book => {
        const { dateDifference, ...cleanBook } = book;
        return cleanBook;
      });
  };

  const getRecentBooks = useCallback((books) => {
    if (!books?.length) return [];
    return [...books]
      .sort((a, b) => new Date(b.day_added) - new Date(a.day_added))
      .slice(0, 5);
  }, []);

  const updateUserBookProgress = async (bookId, lastPages) => {
    try {
      await axiosInstance.put(`/users/${user_id}/books/${bookId}`, {
        last_pages: lastPages
      });
      
      await fetchUserBooks(); 
    } catch (error) {
      console.error('Error updating book progress:', error);
      setError(error.response?.data?.message || 'Failed to update book progress');
    }
  };

  const addBookToUserLibrary = async (bookData) => {
    try {
      await axiosInstance.post(`/users/${user_id}/books`, bookData);
      await fetchUserBooks(); 
      setError(null); 
    } catch (error) {
      console.error('Error adding book to library:', error);
      setError(error.response?.data?.message || 'Failed to add book to library');
    }
  };

  const lastTwoBooks = getLastTwoBooks(userBooks);
  const recentBooks = getRecentBooks(books);

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