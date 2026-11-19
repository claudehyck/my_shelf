import { useState } from "react";
import { Search, ShoppingBag, MousePointerClick, ClipboardList, MessageCircle } from "lucide-react";
import UsedBookCard from "../components/UsedBookCard";
import OrderModal from "../components/OrderModal";
import "./Pages.css";

export default function BukuBekas({ usedBooks, onOrder }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(null); 

  const filtered = usedBooks.filter((u) =>
    u.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const steps = [
    { icon: <MousePointerClick size={22} />, text: "Pilih buku & cek kondisinya" },
    { icon: <ClipboardList size={22} />, text: "Isi form pemesanan" },
    { icon: <MessageCircle size={22} />, text: "Penjual konfirmasi via WhatsApp" },
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
            <UsedBookCard key={item.id} item={item} onOrder={setSelected} />
          ))}
        </div>
      )}

      {selected && (
        <OrderModal
          item={selected}
          onClose={() => setSelected(null)}
          onSubmit={(buyer) => onOrder(selected.id, buyer)}
        />
      )}
    </div>
  );
}
