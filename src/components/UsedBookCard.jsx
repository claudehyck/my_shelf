import { ShoppingCart, Tag } from "lucide-react";
import BookCover from "./BookCover";
import { formatRupiah } from "../utils/format";
import "./BookCard.css";

export default function UsedBookCard({ item, onOrder }) {
  const tersedia = item.status === "Tersedia";
  const kondisiClass = item.condition.toLowerCase().replace(" ", "-"); 

  return (
    <div className={`book-card ${tersedia ? "" : "dim"}`}>
      <div className="card-shelf">
        <BookCover src={item.cover} title={item.title} />
        {!tersedia && <span className="ribbon">{item.status}</span>}
      </div>

      <div className="card-header">
        <span className={`badge-kondisi ${kondisiClass}`}>
          <Tag size={12} /> {item.condition}
        </span>
        <span className="harga">{formatRupiah(item.price)}</span>
      </div>

      <div className="card-body">
        <h3>{item.title}</h3>
        <p>{item.author} &middot; {item.year}</p>
        <p className="used-note">{item.note}</p>
      </div>

      <div className="card-footer">
        <button
          className="btn-pesan"
          disabled={!tersedia}
          onClick={() => onOrder(item)}
        >
          <ShoppingCart size={16} /> {tersedia ? "Pesan Buku" : item.status}
        </button>
      </div>
    </div>
  );
}
