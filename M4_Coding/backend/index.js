/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

let books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg",
    total_pages: 115,
    day_added: "2023-01-15T10:30:00",
  },
  {
    id: 2,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg/220px-The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg",
    total_pages: 224,
    day_added: "2022-05-22T14:45:00",
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg",
    total_pages: 281,
    day_added: "2023-09-08T09:15:00",
  },
  {
    id: 4,
    title: "1984",
    author: "George Orwell",
    image_url: "https://cdn.gramedia.com/uploads/items/9780451524935.jpg",
    total_pages: 328,
    day_added: "2023-03-10T11:00:00",
  },
  {
    id: 5,
    title: "The Phantom of the Opera",
    author: "Gaston Leroux",
    image_url:
      "https://m.media-amazon.com/images/M/MV5BNDczNzg4OTM3MV5BMl5BanBnXkFtZTcwOTQzMTEzMw@@._V1_.jpg",
    total_pages: 190,
    day_added: "2023-02-10T11:00:00",
  },
  {
    id: 6,
    title: "The Alchemist",
    author: "Paulo Coelho",
    image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhM2P-YDSJ1CTvekqJ29Nepvn69q6evyipFg&s",
    total_pages: 208,
    day_added: "2022-02-10T11:00:00",
  },
];

let users = [
  {
    id: "0001",
    username: "dummy1",
    password: "123",
    email: "dummy1@example.com",
    join_at: "2024-01-15",
  },
  {
    id: "0002",
    username: "dummy2",
    password: "123",
    email: "dummy2@example.com",
    join_at: "2024-02-20",
  },
  {
    id: "0003",
    username: "dummy3",
    password: "123",
    email: "dummy3@example.com",
    join_at: "2024-03-10",
  },
];

let usersBook = {
  "0001": [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg",
      last_pages: 50,
      total_pages: 115,
      last_read: "04/03/2024",
    },
  ],
  "0002": [
    {
      id: 3,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg",
      last_pages: 100,
      total_pages: 281,
      last_read: "01/03/2024",
    },
  ],
  "0003": [
    {
      id: 5,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      last_pages: 200,
      total_pages: 279,
      image_url: "https://cdn.gramedia.com/uploads/items/9780451524935.jpg",
      last_read: "15/03/2024",
    },
  ],
};

app.post("/api/users", (req, res) => {
  const { email, username, password } = req.body;

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({
      field: "email",
      message: "Email sudah terdaftar",
    });
  }

  const newUser = {
    id: String(users.length + 1).padStart(4, "0"),
    username,
    email,
    password,
    join_at: new Date().toISOString().split("T")[0],
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin" && password === "admin") {
    return res.json({ role: "admin" });
  }
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(400).json({ message: "Email atau password salah." });
  }

  res.json({ role: "user", user });
});

app.post("/api/books", (req, res) => {
  const { title, author, total_pages, image_url } = req.body;
  const existingBook = books.find(
    (b) =>
      b.title.toLowerCase() === title.toLowerCase() &&
      b.author.toLowerCase() === author.toLowerCase()
  );

  if (existingBook) {
    return res.status(400).json({
      field: "title",
      message: "A book with this title and author already exists",
    });
  }
  if (typeof total_pages !== "number" || isNaN(total_pages)) {
    return res.status(400).json({
      field: "total_pages",
      message: "Total pages must be a valid number",
    });
  }
  try {
    new URL(image_url);
  } catch (err) {
    return res.status(400).json({
      field: "image_url",
      message: "Please provide a valid URL for the image",
    });
  }

  const newBook = {
    id: books.length > 0 ? Math.max(...books.map((b) => b.id)) + 1 : 1,
    title,
    author,
    total_pages,
    image_url,
    day_added: new Date().toISOString(),
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

app.get("/api/books", (req, res) => {
  res.json(books);
});

app.post("/api/books", (req, res) => {
  const newBook = {
    id: books.length + 1,
    day_added: new Date().toISOString(),
    ...req.body,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put("/api/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex((b) => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  books[bookIndex] = { ...books[bookIndex], ...req.body };
  res.json(books[bookIndex]);
});

app.delete("/api/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  books = books.filter((b) => b.id !== bookId);
  res.sendStatus(204);
});

app.get("/api/books", (req, res) => {
  const { search } = req.query;

  if (search) {
    const searchLower = search.toLowerCase();
    const filteredBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchLower) ||
        book.author.toLowerCase().includes(searchLower)
    );
    return res.json(filteredBooks);
  }

  res.json(books);
});

app.delete("/api/users/:userId/books/:bookId", (req, res) => {
  const { userId, bookId } = req.params;

  if (!usersBook[userId]) {
    return res.status(404).json({ message: "User not found" });
  }

  usersBook[userId] = usersBook[userId].filter(
    (book) => book.id !== parseInt(bookId)
  );
  res.sendStatus(204);
});
app.get("/api/users/:userId/books", (req, res) => {
  const { search } = req.query;
  const userBooks = usersBook[req.params.userId] || [];

  if (search) {
    const searchLower = search.toLowerCase();
    const filteredBooks = userBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(searchLower) ||
        book.author.toLowerCase().includes(searchLower)
    );
    return res.json(filteredBooks);
  }
  res.json(userBooks);
});

app.get("/api/users/:userId/books/:bookId", (req, res) => {
  const { userId, bookId } = req.params;

  if (!usersBook[userId]) {
    return res.status(404).json({ message: "User not found" });
  }

  const book = usersBook[userId].find((b) => b.id === parseInt(bookId));
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
});

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.post("/api/users", (req, res) => {
  const newUser = {
    id: String(users.length + 1).padStart(4, "0"),
    join_at: new Date().toISOString().split("T")[0],
    ...req.body,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.get("/api/users/:userId/books", (req, res) => {
  const userBooks = usersBook[req.params.userId] || [];
  res.json(userBooks);
});

app.post("/api/users/:userId/books", (req, res) => {
  const { userId } = req.params;
  if (!usersBook[userId]) {
    usersBook[userId] = [];
  }

  const newUserBook = {
    ...req.body,
    last_read: new Date().toLocaleDateString("en-GB"),
  };

  usersBook[userId].push(newUserBook);
  res.status(201).json(newUserBook);
});
app.delete("/api/users/:userId", (req, res) => {
  const userId = req.params.userId;
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users = users.filter((u) => u.id !== userId);

  if (usersBook[userId]) {
    delete usersBook[userId];
  }

  res.sendStatus(204);
});

app.put("/api/users/:userId/books/:bookId", (req, res) => {
  const { userId, bookId } = req.params;
  const { last_pages } = req.body;

  if (!usersBook[userId]) {
    return res.status(404).json({ message: "User not found" });
  }

  const bookIndex = usersBook[userId].findIndex(
    (b) => b.id === parseInt(bookId)
  );
  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  usersBook[userId][bookIndex] = {
    ...usersBook[userId][bookIndex],
    last_pages,
    last_read: new Date().toLocaleDateString("en-GB"),
  };

  res.json(usersBook[userId][bookIndex]);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
