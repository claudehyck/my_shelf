import { useState } from "react";
import { Search, Library, BookCheck, BookOpen, Bookmark } from "lucide-react";
import BookCard from "../components/BookCard";
import "./Pages.css";

export default function Beranda({ books, comments, isOwner, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("Semua");
  const [status, setStatus] = useState("Semua");


  const categoryList = ["Semua", ...new Set(books.map((b) => b.category))];

  const filteredBooks = books.filter((b) => {
    const cocokJudul = b.title.toLowerCase().includes(searchTerm.toLowerCase());
    const cocokKategori = category === "Semua" || b.category === category;
    const cocokStatus = status === "Semua" || b.status === status;
    return cocokJudul && cocokKategori && cocokStatus;
  });

  const countStatus = (s) => books.filter((b) => b.status === s).length;

  const stats = [
    { icon: <Library size={22} />, label: "Total Buku", value: books.length },
    { icon: <BookCheck size={22} />, label: "Selesai Dibaca", value: countStatus("Selesai Dibaca") },
    { icon: <BookOpen size={22} />, label: "Sedang Dibaca", value: countStatus("Sedang Dibaca") },
    { icon: <Bookmark size={22} />, label: "Ingin Dibaca", value: countStatus("Ingin Dibaca") },
  ];

  return (
    <div className="page-container">
      <div className="hero">
        <h1>Koleksi Buku Pribadi</h1>
        <p>Perpustakaan digital berisi buku yang pernah saya miliki dan baca. Lihat detailnya, baca kesan pembaca lain, dan tinggalkan kesanmu.</p>
      </div>

      <div className="stats">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            {s.icon}
            <div>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="toolbar">
        <div className="search-box">
          <Search size={18} color="#7B6B58" />
          <input
            type="text"
            placeholder="Cari judul buku..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select className="select-filter" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Semua">Semua Status</option>
          <option value="Selesai Dibaca">Selesai Dibaca</option>
          <option value="Sedang Dibaca">Sedang Dibaca</option>
          <option value="Ingin Dibaca">Ingin Dibaca</option>
        </select>
      </div>

      <div className="chips">
        {categoryList.map((c) => (
          <button
            key={c}
            className={`chip ${category === c ? "active" : ""}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {filteredBooks.length === 0 ? (
        <div className="empty-state">
          <Library size={40} />
          <p>Tidak ada buku yang cocok dengan pencarianmu.</p>
        </div>
      ) : (
        <div className="book-grid">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              commentCount={comments.filter((c) => c.bookId === book.id).length}
              isOwner={isOwner}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}