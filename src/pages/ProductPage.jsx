
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import products from "../data/products.json";
import { useCart } from "../hooks/useCart";
import ProductImage from "../components/ProductImage";
import formatPrice from "../utils/formatPrice";

export default function ProductPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();

  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  const returnTo = location.state?.returnTo || "/";

  if (!product) {
    return (
      <main className="page-content empty-state">
        <h1>Product not found</h1>
        <p>The product may have been removed or the URL is incorrect.</p>
        <Link to="/" className="primary-button">
          Return to shop
        </Link>
      </main>
    );
  }

  const cartItem = cartItems.find(
    (item) => String(item.id) === String(product.id)
  );

  return (
    <main className="page-content">
      <button
        type="button"
        className="back-button"
        onClick={() => navigate(returnTo)}
      >
        ← Back to results
      </button>

      <section className="product-detail">
        <div className="detail-image-container">
          <ProductImage
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className="detail-information">
          <p className="eyebrow">{product.category}</p>

          <h1>{product.name}</h1>

          <p className="detail-rating">
            ★ {Number(product.rating || 0).toFixed(1)}
          </p>

          <p className="detail-price">
            {formatPrice(product.price)}
          </p>

          <p className="detail-description">
            {product.description || "A thoughtfully chosen everyday essential."}
          </p>

          <button
            type="button"
            className="primary-button detail-add-button"
            onClick={() => addToCart(product)}
          >
            Add to bag
            {cartItem ? ` (${cartItem.quantity} in bag)` : ""}
          </button>

          <p className="detail-note">
            Your bag updates instantly. Items remain saved in this browser.
          </p>

          <Link to="/cart" className="continue-shopping">
            View bag
          </Link>
        </div>
      </section>
    </main>
  );
}
