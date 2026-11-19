import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, User, Building2, Calendar, FileText, Globe, Hash,
  CalendarCheck, Quote, Users, ShoppingBag,
} from "lucide-react";
import BookCover from "../components/BookCover";
import StarRating from "../components/StarRating";
import CommentSection from "../components/CommentSection";
import { formatRupiah } from "../utils/format";
import "./Pages.css";

export default function DetailBuku({ books, usedBooks, comments, onAddComment }) {
  const { id } = useParams();
  const book = books.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <h2>Buku tidak ditemukan!</h2>
          <Link to="/" className="link-back">Kembali ke Beranda</Link>
        </div>
      </div>
    );
  }

  const bookComments = comments.filter((c) => c.bookId === book.id);

  // cek apakah buku yang sama sedang dijual bekas
  const forSale = usedBooks.find(
    (u) => u.title.toLowerCase() === book.title.toLowerCase() && u.status === "Tersedia"
  );


  const facts = [
    { icon: <User size={16} />, label: "Penulis", value: book.author },
    { icon: <Building2 size={16} />, label: "Penerbit", value: book.publisher },
    { icon: <Calendar size={16} />, label: "Tahun Terbit", value: book.year },
    { icon: <FileText size={16} />, label: "Jumlah Halaman", value: book.pages ? `${book.pages} halaman` : "-" },
    { icon: <Globe size={16} />, label: "Bahasa", value: book.language },
    { icon: <Hash size={16} />, label: "ISBN", value: book.isbn },
    { icon: <CalendarCheck size={16} />, label: "Selesai Dibaca", value: book.finishedAt || "Belum selesai" },
  ];

  return (
    <div className="page-container">
      <Link to="/" className="link-back">
        <ArrowLeft size={18} /> Kembali ke Koleksi
      </Link>

      <div className="detail-grid">
        <aside className="detail-side">
          <BookCover src={book.cover} title={book.title} size="lg" />
          {forSale && (
            <Link to="/second" className="sale-banner">
              <ShoppingBag size={16} />
              Dijual bekas {formatRupiah(forSale.price)}
            </Link>
          )}
        </aside>

        <div className="detail-main">
          <div className="detail-badges">
            <span className="badge-kategori">{book.category}</span>
            <span className="badge-status selesai">{book.status}</span>
          </div>

          <h1 className="detail-title">{book.title}</h1>
          <p className="detail-author">oleh {book.author}</p>

          <div className="detail-rating">
            {book.rating > 0 ? (
              <>
                <StarRating value={book.rating} size={20} />
                <span>Rating pribadi saya: <strong>{book.rating}/5</strong></span>
              </>
            ) : (
              <span className="muted-small">Belum saya beri rating</span>
            )}
          </div>

          <h3 className="section-label">Sinopsis</h3>
          <p>{book.synopsis}</p>

          <div className="facts">
            {facts.map((f) => (
              <div key={f.label} className="fact">
                <span className="fact-icon">{f.icon}</span>
                <div>
                  <small>{f.label}</small>
                  <strong>{f.value}</strong>
                </div>
              </div>
            ))}
          </div>

          <h3 className="section-label">Catatan Pribadi</h3>
          <p className="note-box">{book.notes || "Belum ada catatan."}</p>

          {book.quote && (
            <blockquote className="quote-box">
              <Quote size={20} />
              {book.quote}
            </blockquote>
          )}

          <p className="recommend">
            <Users size={16} /> <strong>Cocok untuk:</strong> {book.recommendedFor || "-"}
          </p>
        </div>
      </div>

      <CommentSection bookId={book.id} comments={bookComments} onAddComment={onAddComment} />
    </div>
  );
}
