// Mengubah angka menjadi format rupiah: 75000 -> "Rp 75.000"
export const formatRupiah = (angka) =>
  "Rp " + Number(angka).toLocaleString("id-ID");

// Tanggal hari ini dalam bahasa Indonesia: "19 November 2026"
export const tanggalHariIni = () =>
  new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
