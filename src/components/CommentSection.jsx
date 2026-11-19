import { useState } from "react";
import { MessageCircle, Send, User } from "lucide-react";
import StarRating from "./StarRating";
import { tanggalHariIni } from "../utils/format";

// Kolom komentar pengunjung.
// props: bookId, comments (komentar milik buku ini saja), onAddComment
export default function CommentSection({ bookId, comments, onAddComment }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const average =
    comments.length > 0
      ? comments.reduce((total, c) => total + c.rating, 0) / comments.length
      : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim() || rating === 0) {
      setError("Nama, rating bintang, dan kesan wajib diisi.");
      return;
    }

    onAddComment({
      id: "c" + Date.now(),
      bookId,
      name: name.trim(),
      rating,
      text: text.trim(),
      date: tanggalHariIni(),
    });

    setName("");
    setRating(0);
    setText("");
    setError("");
  };

  return (
    <section className="comment-section">
      <div className="comment-title">
        <h2><MessageCircle size={22} /> Kesan Pembaca ({comments.length})</h2>
        {comments.length > 0 && (
          <div className="avg-rating">
            <StarRating value={average} size={18} />
            <strong>{average.toFixed(1)}</strong> / 5
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="comment-form">
        <p className="comment-hint">Pernah membaca buku ini? Bagikan kesanmu untuk membantu pembaca lain.</p>
        <div className="form-group">
          <label>Nama</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama kamu" />
        </div>
        <div className="form-group">
          <label>Rating</label>
          <StarRating value={rating} size={26} onChange={setRating} />
        </div>
        <div className="form-group">
          <label>Kesan setelah membaca</label>
          <textarea
            rows="3"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Apa yang kamu suka? Cocok untuk siapa?"
          />
        </div>
        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="btn-simpan">
          <Send size={16} /> Kirim Kesan
        </button>
      </form>

      {comments.length === 0 && (
        <p className="empty-small">Belum ada kesan. Jadilah yang pertama!</p>
      )}

      <div className="comment-list">
        {comments.map((c) => (
          <div key={c.id} className="comment-item">
            <div className="comment-avatar"><User size={18} /></div>
            <div>
              <div className="comment-head">
                <strong>{c.name}</strong>
                <StarRating value={c.rating} size={14} />
                <span className="muted-small">{c.date}</span>
              </div>
              <p>{c.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
