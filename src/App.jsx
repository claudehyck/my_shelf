import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import {
  initialBooks,
  initialUsedBooks,
  initialComments,
} from "./data/myBooksData";
import { OWNER_PASSWORD } from "./utils/config";
import { tanggalHariIni } from "./utils/format";
import Navbar from "./components/Navbar";
import Beranda from "./pages/Beranda";
import DetailBuku from "./pages/DetailBuku";
import TambahBuku from "./pages/TambahBuku";
import BukuBekas from "./pages/BukuBekas";
import Pesanan from "./pages/Pesanan";
import Login from "./pages/Login";
import "./App.css";

const FLOW = ["Baru", "Dikemas", "Dikirim", "Selesai"];

export default function App() {
  const [books, setBooks] = useState(initialBooks);
  const [usedBooks, setUsedBooks] = useState(initialUsedBooks);
  const [comments, setComments] = useState(initialComments);
  const [orders, setOrders] = useState([]);
  const [isOwner, setIsOwner] = useState(sessionStorage.getItem("owner") === "1");

  const handleLogin = (password) => {
    if (password === OWNER_PASSWORD) {
      setIsOwner(true);
      sessionStorage.setItem("owner", "1");
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsOwner(false);
    sessionStorage.removeItem("owner");
  };

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

  const setUsedStatus = (usedBookId, status) => {
    setUsedBooks((list) =>
      list.map((u) => (u.id === usedBookId ? { ...u, status } : u))
    );
  };

  const handleAddOrder = (data) => {
    const item = usedBooks.find((u) => u.id === data.usedBookId);
    const newOrder = {
      id: "o" + Date.now(),
      usedBookId: item.id,
      bookTitle: item.title,
      price: item.price,
      date: tanggalHariIni(),
      status: "Baru",
      ...data, // name, phone, address, note
    };
    setOrders([newOrder, ...orders]);
    setUsedStatus(item.id, "Dipesan");
  };

  const handleAdvanceOrder = (orderId) => {
    const order = orders.find((o) => o.id === orderId);
    const next = FLOW[FLOW.indexOf(order.status) + 1];
    if (!next) return;

    setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: next } : o)));
    if (next === "Selesai") setUsedStatus(order.usedBookId, "Terjual");
  };

  const handleCancelOrder = (orderId) => {
    const order = orders.find((o) => o.id === orderId);
    setOrders(orders.filter((o) => o.id !== orderId));
    setUsedStatus(order.usedBookId, "Tersedia");
  };

  const activeOrderCount = orders.filter((o) => o.status !== "Selesai").length;

  return (
    <Router>
      <div className="app-main">
        <Navbar isOwner={isOwner} orderCount={activeOrderCount} onLogout={handleLogout} />

        <div className="app-content">
          <Routes>
            <Route
              path="/"
              element={
                <Beranda
                  books={books}
                  comments={comments}
                  isOwner={isOwner}
                  onDelete={handleDeleteBook}
                />
              }
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
            <Route path="/second" element={<BukuBekas usedBooks={usedBooks} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />

            {/* Halaman khusus pemilik: pengunjung dialihkan ke halaman login */}
            <Route
              path="/add"
              element={
                isOwner ? <TambahBuku onAddBook={handleAddBook} /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/orders"
              element={
                isOwner ? (
                  <Pesanan
                    usedBooks={usedBooks}
                    orders={orders}
                    flow={FLOW}
                    onAddOrder={handleAddOrder}
                    onAdvance={handleAdvanceOrder}
                    onCancel={handleCancelOrder}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </div>

        <footer className="footer">
          <BookOpen size={16} /> MyShelf &mdash; Perpustakaan Digital Pribadi
        </footer>
      </div>
    </Router>
  );
}