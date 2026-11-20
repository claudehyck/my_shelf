import { MessageCircle, Tag } from "lucide-react";
import BookCover from "./BookCover";
import { formatRupiah, waLink } from "../utils/format";
import { OWNER_WA } from "../utils/config";
import "./BookCard.css";

export default function UsedBookCard({ item }) {
  const tersedia = item.status === "Tersedia";
  const kondisiClass = item.condition.toLowerCase().replace(" ", "-"); 

  const pesan = `Halo kak, saya tertarik dengan buku bekas "${item.title}" (${formatRupiah(item.price)}). Apakah masih tersedia?`;

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
        {tersedia ? (
          <a
            className="btn-pesan"
            href={waLink(OWNER_WA, pesan)}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={16} /> Pesan via WhatsApp
          </a>
        ) : (
          <button className="btn-pesan" disabled>{item.status}</button>
        )}
      </div>
    </div>
  );
}