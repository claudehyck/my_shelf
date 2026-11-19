import { useState } from "react";
import { Star } from "lucide-react";

export default function StarRating({ value = 0, size = 18, onChange }) {
  const [hover, setHover] = useState(0);
  const active = Math.round(hover || value);

  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          className={n <= active ? "star on" : "star"}
          fill={n <= active ? "currentColor" : "none"}
          style={{ cursor: onChange ? "pointer" : "default" }}
          onClick={onChange ? () => onChange(n) : undefined}
          onMouseEnter={onChange ? () => setHover(n) : undefined}
          onMouseLeave={onChange ? () => setHover(0) : undefined}
        />
      ))}
    </div>
  );
}
