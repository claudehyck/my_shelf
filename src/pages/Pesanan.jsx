import { Package, Phone, MapPin, StickyNote } from "lucide-react";
import { formatRupiah } from "../utils/format";
import "./Pages.css";


export default function Pesanan({ orders }) {
  return (
    <div className="page-container narrow">
      <div className="hero">
        <h1>Pesanan Masuk</h1>
        <p>Daftar pesanan buku bekas dari pengunjung.</p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <Package size={40} />
          <p>Belum ada pesanan.</p>
        </div>
      ) : (
        <div className="order-list">
          {orders.map((o) => (
            <div key={o.id} className="order-item">
              <div className="order-head">
                <h3>{o.bookTitle}</h3>
                <span className="harga">{formatRupiah(o.price)}</span>
              </div>
              <p><strong>{o.name}</strong> &middot; <span className="muted-small">{o.date}</span></p>
              <p className="order-line"><Phone size={14} /> {o.phone}</p>
              <p className="order-line"><MapPin size={14} /> {o.address}</p>
              {o.note && <p className="order-line"><StickyNote size={14} /> {o.note}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
