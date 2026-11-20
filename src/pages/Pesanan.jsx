import { useState } from "react";
import { Package, Phone, MapPin, StickyNote, Plus, Check, MessageCircle, X } from "lucide-react";
import { formatRupiah, toWaNumber, waLink } from "../utils/format";
import "./Pages.css";

export default function Pesanan({ usedBooks, orders, flow, onAddOrder, onAdvance, onCancel }) {
  const [tab, setTab] = useState("aktif"); // "aktif" | "riwayat"
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ usedBookId: "", name: "", phone: "", address: "", note: "" });
  const [error, setError] = useState("");

  const available = usedBooks.filter((u) => u.status === "Tersedia");
  const aktif = orders.filter((o) => o.status !== "Selesai");
  const riwayat = orders.filter((o) => o.status === "Selesai");
  const shown = tab === "aktif" ? aktif : riwayat;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.usedBookId || !form.name.trim() || !form.phone.trim()) {
      setError("Pilih buku, isi nama dan nomor WhatsApp pembeli.");
      return;
    }
    onAddOrder(form);
    setForm({ usedBookId: "", name: "", phone: "", address: "", note: "" });
    setError("");
    setShowForm(false);
    setTab("aktif");
  };

  const handleCancel = (o) => {
    if (window.confirm(`Batalkan pesanan "${o.bookTitle}" dari ${o.name}?`)) onCancel(o.id);
  };

  return (
    <div className="page-container narrow">
      <div className="hero">
        <h1>Pesanan Masuk</h1>
        <p>Catat pesanan dari chat WhatsApp, lalu pantau statusnya sampai buku terkirim.</p>
      </div>

      <button className="btn-simpan btn-add-order" onClick={() => setShowForm(!showForm)}>
        {showForm ? <><X size={16} /> Tutup Form</> : <><Plus size={16} /> Catat Pesanan Baru</>}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="form-box order-form">
          <div className="form-group">
            <label>Buku yang dipesan</label>
            <select name="usedBookId" value={form.usedBookId} onChange={handleChange}>
              <option value="">-- Pilih buku (yang tersedia) --</option>
              {available.map((u) => (
                <option key={u.id} value={u.id}>{u.title} - {formatRupiah(u.price)}</option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Nama Pembeli</label>
              <input name="name" value={form.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Nomor WhatsApp</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="08xxxxxxxxxx" />
            </div>
          </div>
          <div className="form-group">
            <label>Alamat Pengiriman</label>
            <input name="address" value={form.address} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Catatan</label>
            <input name="note" value={form.note} onChange={handleChange} />
          </div>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="btn-simpan">Simpan Pesanan</button>
        </form>
      )}

      <div className="tabs">
        <button className={`tab ${tab === "aktif" ? "active" : ""}`} onClick={() => setTab("aktif")}>
          Aktif ({aktif.length})
        </button>
        <button className={`tab ${tab === "riwayat" ? "active" : ""}`} onClick={() => setTab("riwayat")}>
          Riwayat ({riwayat.length})
        </button>
      </div>

      {shown.length === 0 ? (
        <div className="empty-state">
          <Package size={40} />
          <p>{tab === "aktif" ? "Belum ada pesanan aktif." : "Belum ada pesanan yang selesai."}</p>
        </div>
      ) : (
        <div className="order-list">
          {shown.map((o) => {
            const idx = flow.indexOf(o.status);
            const next = flow[idx + 1];

            return (
              <div key={o.id} className="order-item">
                <div className="order-head">
                  <h3>{o.bookTitle}</h3>
                  <span className="harga">{formatRupiah(o.price)}</span>
                </div>
                <p><strong>{o.name}</strong> &middot; <span className="muted-small">{o.date}</span></p>
                <p className="order-line"><Phone size={14} /> {o.phone}</p>
                {o.address && <p className="order-line"><MapPin size={14} /> {o.address}</p>}
                {o.note && <p className="order-line"><StickyNote size={14} /> {o.note}</p>}

                {/* penunjuk tahapan status */}
                <div className="stepper">
                  {flow.map((s, i) => (
                    <div key={s} className={`stp ${i <= idx ? "done" : ""}`}>
                      <span className="dot">{i < idx || o.status === "Selesai" ? <Check size={12} /> : i + 1}</span>
                      {s}
                    </div>
                  ))}
                </div>

                <div className="order-actions">
                  <a
                    className="btn-mini wa"
                    target="_blank"
                    rel="noreferrer"
                    href={waLink(
                      toWaNumber(o.phone),
                      `Halo kak ${o.name}, pesanan buku "${o.bookTitle}" statusnya sekarang: ${o.status}.`
                    )}
                  >
                    <MessageCircle size={14} /> Chat Pembeli
                  </a>

                  {next && (
                    <button className="btn-mini primary" onClick={() => onAdvance(o.id)}>
                      {next === "Selesai" ? "Tandai Selesai (Terjual)" : `Tandai ${next}`}
                    </button>
                  )}
                  {next && (
                    <button className="btn-mini danger" onClick={() => handleCancel(o)}>Batalkan</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}