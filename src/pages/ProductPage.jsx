
import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import products from "../data/products.json";
import ProductImage from "../components/ProductImage";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils/formatPrice";

export default function ProductPage() {
  const { id } = useParams();
  const location = useLocation();
  const { addToCart, lastAddedId } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((item) => String(item.id) === String(id));
  const returnTo = location.state?.returnTo || "/";
  const added = lastAddedId === product?.id;

  if (!product) {
    return (
      <main className="page-content">
        <div className="empty-state">
          <h2>Product not found</h2>
          <Link to="/" className="primary-button">
            Back to shop
          </Link>
        </div>
      </main>
    );
  }

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i += 1) {
      addToCart(product);
    }
  };

  return (
    <main className="page-content product-detail-page">
      <Link to={returnTo} className="back-button">
        ← Back to shop
      </Link>

      <section className="product-detail">
        <div className="detail-image-container">
          <ProductImage product={product} />
        </div>

        <div className="detail-information">
          <p className="eyebrow">{product.category}</p>

          <h1>{product.name}</h1>

          <p className="detail-rating">★ {product.rating}</p>

          <p className="detail-price">{formatPrice(product.price)}</p>

          <p className="detail-description">{product.description}</p>

          <div className="detail-quantity-section">
            <span className="detail-quantity-label">Quantity</span>

            <div
              className="quantity-control detail-quantity-control"
              aria-label="Select product quantity"
            >
              <button
                type="button"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span aria-live="polite">{quantity}</span>

              <button
                type="button"
                onClick={increaseQuantity}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            className="primary-button detail-add-button"
            onClick={handleAddToCart}
          >
            {added ? "Add more to bag" : "Add to bag"} ({quantity})
          </button>

          <p className="detail-note">
            Your bag updates instantly. Items remain saved in this browser.
          </p>

          <Link to="/cart" className="view-bag-link">
            View bag
          </Link>
        </div>
      </section>
    </main>
  );
}
