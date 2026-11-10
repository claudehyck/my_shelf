import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { initialBooks } from "./data/myBooksData";
import Navbar from "./components/Navbar";
import Beranda from "./pages/Beranda";
import DetailBuku from "./pages/DetailBuku";
import TambahBuku from "./pages/TambahBuku";
import "./App.css";

export default function App() {
  const [books, setBooks] = useState(initialBooks);

  const handleAddBook = (newBook) => {
    setBooks([newBook, ...books]);
  };

  const handleDeleteBook = (id) => {
    setBooks(books.filter((b) => b.id !== id));
  };

  return (
    <Router>
      <div className="app-main">
        <Navbar />
        <Routes>
          <Route path="/" element={<Beranda books={books} onDelete={handleDeleteBook} />} />
          <Route path="/book/:id" element={<DetailBuku books={books} />} />
          <Route path="/add" element={<TambahBuku onAddBook={handleAddBook} />} />
        </Routes>
      </div>
    </Router>
  );
}