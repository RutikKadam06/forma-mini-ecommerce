
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import ProductImage from "./ProductImage";
import { formatPrice } from "../utils/formatPrice";

export default function ProductCard({ product, returnTo = "/" }) {
  const { addToCart, cartItems } = useCart();

  const cartItem = cartItems.find(
    (item) => String(item.id) === String(product.id)
  );

  const quantity = cartItem?.quantity || 0;

  return (
    <article className="product-card">
      <div className="product-image-container">
        <Link
          to={`/products/${product.id}`}
          state={{ returnTo }}
          className="product-image-link"
          aria-label={`View ${product.name}`}
        >
          <ProductImage
            src={product.image}
            alt={product.name}
            className="product-image"
          />
        </Link>

        <button
          type="button"
          className="add-to-cart-btn"
          onClick={() => addToCart(product)}
          aria-label={`Add ${product.name} to bag`}
          title={`Add ${product.name} to bag`}
        >
          {quantity > 0 ? quantity : "+"}
        </button>
      </div>

      <div className="product-meta">
        <span>{product.category}</span>
        <span className="product-rating">
          ★ {Number(product.rating || 0).toFixed(1)}
        </span>
      </div>

      <Link
        to={`/products/${product.id}`}
        state={{ returnTo }}
        className="product-name"
      >
        {product.name}
      </Link>

      <div className="product-price-row">
        <span className="product-price">
          {formatPrice(product.price)}
        </span>
        <span className="product-tag">Everyday essential</span>
      </div>
    </article>
  );
}
