import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./Pages.css";

export default function DetailBuku({ books }) {
  const { id } = useParams();
  const book = books.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="page-container">
        <h2>Buku tidak ditemukan!</h2>
        <Link to="/">Kembali ke Beranda</Link>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ maxWidth: "600px" }}>
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: "6px", textDecoration: "none", marginBottom: "20px" }}>
        <ArrowLeft size={18} /> Kembali
      </Link>

      <div className="form-box">
        <span className="badge-kategori" style={{ width: "fit-content" }}>{book.category}</span>
        
        {/* Perubahan ada di sini: ditambahkan style color old gold */}
        <h2 style={{ color: "#BAAB35", margin: "10px 0" }}>{book.title}</h2>
        
        <p style={{ color: "#666" }}>Penulis: <strong>{book.author}</strong> | Tahun: {book.year}</p>
        <hr />
        <p><strong>Status:</strong> {book.status}</p>
        <div>
          <strong>Catatan Pribadi:</strong>
          <p style={{ background: "#FDFFF4", padding: "10px", borderRadius: "6px", marginTop: "6px", border: "1px solid #EAD392" }}>
            {book.notes || "Belum ada catatan."}
          </p>
        </div>
      </div>
    </div>
  );
}