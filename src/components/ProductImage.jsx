
import { useState } from "react";

const FALLBACK_IMAGE =
  "https://placehold.co/600x600/eeeae2/333333?text=Product";

export default function ProductImage({
  src,
  alt,
  className = "",
}) {
  const [failed, setFailed] = useState(false);

  return (
    <img
      className={className}
      src={failed || !src ? FALLBACK_IMAGE : src}
      alt={alt || "Product"}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
