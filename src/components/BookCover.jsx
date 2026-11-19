import { useState } from "react";
import { Book } from "lucide-react";

export default function BookCover({ src, title, size = "md" }) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className={`cover cover-fallback ${size}`}>
        <Book size={size === "sm" ? 20 : 30} />
        <span>{title}</span>
      </div>
    );
  }

  return (
    <img
      className={`cover ${size}`}
      src={src}
      alt={`Sampul ${title}`}
      onError={() => setError(true)}
    />
  );
}
