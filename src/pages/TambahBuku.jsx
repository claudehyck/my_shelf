import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Pages.css";

export default function TambahBuku({ onAddBook }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("Pemrograman");
  const [status, setStatus] = useState("Selesai Dibaca");
  const [notes, setNotes] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author) {
      alert("Judul dan Penulis wajib diisi!");
      return;
    }

    const newBook = {
      id: Date.now().toString(),
      title,
      author,
      year: year ? Number(year) : 2026,
      category,
      status,
      notes,
    };

    onAddBook(newBook);
    navigate("/");
  };

  return (
    <div className="page-container" style={{ maxWidth: "500px" }}>
      <h1>Tambah Buku Baru</h1>

      <form onSubmit={handleSubmit} className="form-box">
        <div className="form-group">
          <label>Judul Buku</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Penulis</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Tahun Terbit</label>
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Kategori</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Pemrograman">Pemrograman</option>
            <option value="Kuliah">Kuliah</option>
            <option value="Novel">Novel</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>

        <div className="form-group">
          <label>Status Baca</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Selesai Dibaca">Selesai Dibaca</option>
            <option value="Sedang Dibaca">Sedang Dibaca</option>
            <option value="Ingin Dibaca">Ingin Dibaca</option>
          </select>
        </div>

        <div className="form-group">
          <label>Catatan Pribadi</label>
          <textarea rows="3" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>

        <button type="submit" className="btn-simpan">Simpan Buku</button>
      </form>
    </div>
  );
}