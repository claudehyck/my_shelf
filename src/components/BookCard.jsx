import { Link } from "react-router-dom";
import { Trash2, MessageCircle } from "lucide-react";
import BookCover from "./BookCover";
import StarRating from "./StarRating";
import "./BookCard.css";

const statusClass = {
  "Selesai Dibaca": "selesai",
  "Sedang Dibaca": "proses",
  "Ingin Dibaca": "ingin",
};

export default function BookCard({ book, commentCount, isOwner, onDelete }) {
  const handleDelete = () => {
    if (window.confirm(`Hapus "${book.title}" dari koleksi?`)) {
      onDelete(book.id);
    }
  };

  return (
    <div className="book-card">
      <Link to={`/book/${book.id}`} className="card-shelf">
        <BookCover src={book.cover} title={book.title} />
      </Link>

      <div className="card-header">
        <span className="badge-kategori">{book.category}</span>
        <span className={`badge-status ${statusClass[book.status]}`}>{book.status}</span>
      </div>

      <div className="card-body">
        <h3>{book.title}</h3>
        <p>{book.author} &middot; {book.year}</p>

        <div className="card-meta">
          {book.rating > 0 ? (
            <StarRating value={book.rating} size={15} />
          ) : (
            <span className="muted-small">Belum dinilai</span>
          )}
          <span className="comment-count">
            <MessageCircle size={14} /> {commentCount}
          </span>
        </div>
      </div>

      <div className="card-footer">
        <Link to={`/book/${book.id}`}>Lihat Detail &rarr;</Link>
        {isOwner && (
          <button onClick={handleDelete} className="btn-hapus">
            <Trash2 size={16} /> Hapus
          </button>
        )}
      </div>
    </div>
  );
}