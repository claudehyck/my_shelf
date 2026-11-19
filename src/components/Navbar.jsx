import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { BookOpen, PlusCircle, Home, ShoppingBag, Package, Menu, X } from "lucide-react";
import "./Navbar.css";

export default function Navbar({ orderCount }) {
  const [open, setOpen] = useState(false); 

  const closeMenu = () => setOpen(false);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo" onClick={closeMenu}>
        <BookOpen size={26} />
        <h2>MyShelf</h2>
      </Link>

      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Menu">
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`navbar-links ${open ? "open" : ""}`}>
        <NavLink to="/" end onClick={closeMenu}>
          <Home size={17} /> Beranda
        </NavLink>
        <NavLink to="/second" onClick={closeMenu}>
          <ShoppingBag size={17} /> Buku Bekas
        </NavLink>
        <NavLink to="/orders" onClick={closeMenu}>
          <Package size={17} /> Pesanan
          {orderCount > 0 && <span className="badge-count">{orderCount}</span>}
        </NavLink>
        <Link to="/add" className="btn-tambah" onClick={closeMenu}>
          <PlusCircle size={18} /> Tambah Buku
        </Link>
      </div>
    </nav>
  );
}
