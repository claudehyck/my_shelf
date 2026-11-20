import { useState } from "react";
import { Search, ShoppingBag, MousePointerClick, MessageCircle, Truck } from "lucide-react";
import UsedBookCard from "../components/UsedBookCard";
import "./Pages.css";

export default function BukuBekas({ usedBooks }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = usedBooks.filter((u) =>
    u.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const steps = [
    { icon: <MousePointerClick size={22} />, text: "Pilih buku & cek kondisinya" },
    { icon: <MessageCircle size={22} />, text: "Klik pesan, lanjut chat via WhatsApp" },
    { icon: <Truck size={22} />, text: "Buku dikemas & dikirim ke alamatmu" },
  ];

  return (
    <div className="page-container">
      <div className="hero">
        <h1>Buku Bekas Pilihan</h1>
        <p>Buku-buku yang sudah selesai saya baca dan siap menemani rak bukumu.</p>
      </div>

      <div className="steps">
        {steps.map((s, i) => (
          <div key={i} className="step">
            <span className="step-icon">{s.icon}</span>
            <span><strong>{i + 1}.</strong> {s.text}</span>
          </div>
        ))}
      </div>

      <div className="toolbar">
        <div className="search-box">
          <Search size={18} color="#7B6B58" />
          <input
            placeholder="Cari buku bekas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <ShoppingBag size={40} />
          <p>Buku bekas tidak ditemukan.</p>
        </div>
      ) : (
        <div className="book-grid">
          {filtered.map((item) => (
            <UsedBookCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}