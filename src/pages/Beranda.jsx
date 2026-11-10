import { useState } from "react";
import BookCard from "../components/BookCard";
import { Search } from "lucide-react";
import "./Pages.css";

export default function Beranda({ books, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <h1>Koleksi Buku Pribadi</h1>
      <p style={{ color: "#666" }}>Daftar buku yang pernah saya miliki dan baca.</p>

      <div className="search-box">
        <Search size={18} color="#666" />
        <input 
          type="text" 
          placeholder="Cari judul buku..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>

      <div className="book-grid">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}