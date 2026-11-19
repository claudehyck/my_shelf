import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookCover from "../components/BookCover";
import { categories, statuses, conditions } from "../data/myBooksData";
import "./Pages.css";

export default function TambahBuku({ onAddBook }) {
  // satu state berisi semua isian form
  const [form, setForm] = useState({
    title: "", author: "", year: "", publisher: "", pages: "", isbn: "",
    language: "Indonesia", category: "Pemrograman", status: "Selesai Dibaca",
    rating: "0", finishedAt: "", cover: "", synopsis: "", notes: "",
    quote: "", recommendedFor: "",
  });

  // pengaturan jual buku bekas
  const [forSale, setForSale] = useState(false);
  const [sale, setSale] = useState({ price: "", condition: "Baik", note: "" });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSaleChange = (e) => setSale({ ...sale, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.author.trim()) {
      setError("Judul dan Penulis wajib diisi!");
      return;
    }
    if (forSale && !sale.price) {
      setError("Isi harga jual untuk buku bekas.");
      return;
    }

    const newBook = {
      id: Date.now().toString(),
      ...form,
      year: form.year ? Number(form.year) : 2026,
      pages: form.pages ? Number(form.pages) : 0,
      rating: Number(form.rating),
      isbn: form.isbn || "-",
    };

    const saleInfo = forSale
      ? { price: Number(sale.price), condition: sale.condition, note: sale.note || "Kondisi sesuai deskripsi." }
      : null;

    onAddBook(newBook, saleInfo);
    navigate(forSale ? "/second" : "/");
  };

  return (
    <div className="page-container narrow">
      <h1>Tambah Buku Baru</h1>

      <form onSubmit={handleSubmit} className="form-box">
        <div className="cover-preview">
          <BookCover src={form.cover} title={form.title || "Sampul Buku"} size="md" />
          <div className="form-group grow">
            <label>Link Gambar Sampul</label>
            <input name="cover" value={form.cover} onChange={handleChange} placeholder="https://... atau /covers/nama-file.jpg" />
            <small>Kosongkan jika belum ada. Sampul pengganti akan dibuat otomatis.</small>
          </div>
        </div>

        <div className="form-group">
          <label>Judul Buku *</label>
          <input name="title" value={form.title} onChange={handleChange} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Penulis *</label>
            <input name="author" value={form.author} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Penerbit</label>
            <input name="publisher" value={form.publisher} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Tahun Terbit</label>
            <input type="number" name="year" value={form.year} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Jumlah Halaman</label>
            <input type="number" name="pages" value={form.pages} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>ISBN</label>
            <input name="isbn" value={form.isbn} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Bahasa</label>
            <input name="language" value={form.language} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Kategori</label>
            <select name="category" value={form.category} onChange={handleChange}>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Status Baca</label>
            <select name="status" value={form.status} onChange={handleChange}>
              {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Rating Pribadi</label>
            <select name="rating" value={form.rating} onChange={handleChange}>
              <option value="0">Belum dinilai</option>
              {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n} bintang</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Selesai Dibaca (bulan/tahun)</label>
            <input name="finishedAt" value={form.finishedAt} onChange={handleChange} placeholder="Contoh: Mei 2025" />
          </div>
        </div>

        <div className="form-group">
          <label>Sinopsis</label>
          <textarea name="synopsis" rows="3" value={form.synopsis} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Catatan Pribadi</label>
          <textarea name="notes" rows="2" value={form.notes} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Kutipan Favorit</label>
          <input name="quote" value={form.quote} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Cocok Dibaca Oleh</label>
          <input name="recommendedFor" value={form.recommendedFor} onChange={handleChange} placeholder="Contoh: Pemula yang baru belajar" />
        </div>

        <label className="checkbox-row">
          <input type="checkbox" checked={forSale} onChange={(e) => setForSale(e.target.checked)} />
          Jual buku ini sebagai buku bekas
        </label>

        {forSale && (
          <div className="sale-box">
            <div className="form-row">
              <div className="form-group">
                <label>Harga (Rp)</label>
                <input type="number" name="price" value={sale.price} onChange={handleSaleChange} />
              </div>
              <div className="form-group">
                <label>Kondisi</label>
                <select name="condition" value={sale.condition} onChange={handleSaleChange}>
                  {conditions.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Catatan Kondisi</label>
              <input name="note" value={sale.note} onChange={handleSaleChange} placeholder="Contoh: ada coretan di halaman 10" />
            </div>
          </div>
        )}

        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="btn-simpan">Simpan Buku</button>
      </form>
    </div>
  );
}
