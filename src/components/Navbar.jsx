import { Link } from "react-router-dom";
import { BookOpen, PlusCircle } from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <BookOpen size={24} />
        <h2>MyShelf</h2>
      </div>
      <div className="navbar-links">
        <Link to="/">Beranda</Link>
        <Link to="/add" className="btn-tambah">
          <PlusCircle size={18} /> Tambah Buku
        </Link>
      </div>
    </nav>
  );
}