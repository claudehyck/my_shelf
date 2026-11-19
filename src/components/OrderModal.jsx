import { useState } from "react";
import { X, Check, Send } from "lucide-react";
import BookCover from "./BookCover";
import { formatRupiah } from "../utils/format";

export default function OrderModal({ item, onClose, onSubmit }) {
  const [form, setForm] = useState({ name: "", phone: "", address: "", note: "" });
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      setError("Nama, nomor WhatsApp, dan alamat wajib diisi.");
      return;
    }
    onSubmit(form);
    setDone(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Tutup">
          <X size={20} />
        </button>

        {done ? (
          <div className="modal-success">
            <div className="success-icon"><Check size={34} /></div>
            <h2>Pesanan Terkirim!</h2>
            <p>
              Terima kasih, {form.name}. Pesanan <strong>{item.title}</strong> sudah
              dicatat. Penjual akan menghubungi nomor {form.phone} untuk konfirmasi
              pembayaran dan pengiriman.
            </p>
            <button className="btn-simpan" onClick={onClose}>Tutup</button>
          </div>
        ) : (
          <>
            <div className="modal-book">
              <BookCover src={item.cover} title={item.title} size="sm" />
              <div>
                <h3>{item.title}</h3>
                <p className="muted-small">{item.author}</p>
                <p className="harga">{formatRupiah(item.price)}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>Nama Lengkap</label>
                <input name="name" value={form.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Nomor WhatsApp</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="08xxxxxxxxxx" />
              </div>
              <div className="form-group">
                <label>Alamat Pengiriman</label>
                <textarea name="address" rows="2" value={form.address} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Catatan (opsional)</label>
                <input name="note" value={form.note} onChange={handleChange} placeholder="Contoh: COD di kampus" />
              </div>
              {error && <p className="form-error">{error}</p>}
              <button type="submit" className="btn-simpan">
                <Send size={16} /> Kirim Pesanan
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
