import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import "./Pages.css";

export default function Login({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin(password)) {
      navigate("/orders");
    } else {
      setError("Kata sandi salah.");
    }
  };

  return (
    <div className="page-container narrow">
      <form onSubmit={handleSubmit} className="form-box login-box">
        <div className="login-icon"><Lock size={30} /></div>
        <h2>Masuk Pemilik</h2>
        <p className="muted-small">Halaman ini hanya untuk pemilik MyShelf.</p>

        <div className="form-group">
          <label>Kata Sandi</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
        </div>
        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="btn-simpan">Masuk</button>
      </form>
    </div>
  );
}