import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BookOpen } from "lucide-react";
import {
  initialBooks,
  initialUsedBooks,
  initialComments,
} from "./data/myBooksData";
import { tanggalHariIni } from "./utils/format";
import Navbar from "./components/Navbar";
import Beranda from "./pages/Beranda";
import DetailBuku from "./pages/DetailBuku";
import TambahBuku from "./pages/TambahBuku";
import BukuBekas from "./pages/BukuBekas";
import Pesanan from "./pages/Pesanan";
import "./App.css";

export default function App() {
  // ===== STATE UTAMA (disimpan di App lalu dikirim lewat props) =====
  const [books, setBooks] = useState(initialBooks);
  const [usedBooks, setUsedBooks] = useState(initialUsedBooks);
  const [comments, setComments] = useState(initialComments);
  const [orders, setOrders] = useState([]);

  // Tambah buku koleksi. Jika saleInfo ada, buku juga dimasukkan ke daftar buku bekas.
  const handleAddBook = (newBook, saleInfo) => {
    setBooks([newBook, ...books]);

    if (saleInfo) {
      const usedBook = {
        id: "u" + Date.now(),
        title: newBook.title,
        author: newBook.author,
        year: newBook.year,
        cover: newBook.cover,
        condition: saleInfo.condition,
        price: saleInfo.price,
        note: saleInfo.note,
        status: "Tersedia",
      };
      setUsedBooks([usedBook, ...usedBooks]);
    }
  };

  const handleDeleteBook = (id) => {
    setBooks(books.filter((b) => b.id !== id));
    setComments(comments.filter((c) => c.bookId !== id));
  };

  const handleAddComment = (newComment) => {
    setComments([newComment, ...comments]);
  };

  // Pengunjung memesan buku bekas -> catat pesanan + ubah status buku jadi "Dipesan"
  const handleOrder = (usedBookId, buyer) => {
    const item = usedBooks.find((u) => u.id === usedBookId);

    const newOrder = {
      id: "o" + Date.now(),
      bookTitle: item.title,
      price: item.price,
      date: tanggalHariIni(),
      ...buyer, // name, phone, address, note
    };

    setOrders([newOrder, ...orders]);
    setUsedBooks(
      usedBooks.map((u) => (u.id === usedBookId ? { ...u, status: "Dipesan" } : u))
    );
  };

  return (
    <Router>
      <div className="app-main">
        <Navbar orderCount={orders.length} />

        <div className="app-content">
          <Routes>
            <Route
              path="/"
              element={<Beranda books={books} comments={comments} onDelete={handleDeleteBook} />}
            />
            <Route
              path="/book/:id"
              element={
                <DetailBuku
                  books={books}
                  usedBooks={usedBooks}
                  comments={comments}
                  onAddComment={handleAddComment}
                />
              }
            />
            <Route path="/add" element={<TambahBuku onAddBook={handleAddBook} />} />
            <Route path="/second" element={<BukuBekas usedBooks={usedBooks} onOrder={handleOrder} />} />
            <Route path="/orders" element={<Pesanan orders={orders} />} />
          </Routes>
        </div>

        <footer className="footer">
          <BookOpen size={16} /> MyShelf &mdash; Perpustakaan Digital Pribadi
        </footer>
      </div>
    </Router>
  );
}
