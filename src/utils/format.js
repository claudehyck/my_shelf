
export const formatRupiah = (angka) =>
  "Rp " + Number(angka).toLocaleString("id-ID");


export const tanggalHariIni = () =>
  new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const toWaNumber = (phone) => {
  const digits = String(phone).replace(/\D/g, "");
  return digits.startsWith("0") ? "62" + digits.slice(1) : digits;
};

export const waLink = (number, message) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;