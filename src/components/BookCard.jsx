import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import "./BookCard.css";

export default function BookCard({ book, onDelete }) {
  return (
    <div className="book-card">
      <div className="card-header">
        <span className="badge-kategori">{book.category}</span>
        <span className={`badge-status ${book.status === "Selesai Dibaca" ? "selesai" : "proses"}`}>
          {book.status}
        </span>
      </div>

      <div className="card-body">
        <h3>{book.title}</h3>
        <p>Penulis: {book.author} ({book.year})</p>
      </div>

      <div className="card-footer">
        <Link to={`/book/${book.id}`}>Lihat Detail &rarr;</Link>
        <button onClick={() => onDelete(book.id)} className="btn-hapus">
          <Trash2 size={16} /> Hapus
        </button>
      </div>
    </div>
  );
}