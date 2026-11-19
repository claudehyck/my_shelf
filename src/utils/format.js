
export const formatRupiah = (angka) =>
  "Rp " + Number(angka).toLocaleString("id-ID");


export const tanggalHariIni = () =>
  new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
