import { useState } from "react";
import {
  Link,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import products from "./data/products.json";
import { useCart } from "./context/CartContext";
import "./App.css";

const categories = [
  "All",
  "Home",
  "Accessories",
  "Workspace",
  "Technology",
];

const FALLBACK_IMAGE =
  "https://placehold.co/600x600/eeeae2/333333?text=Product+Image";

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(price);
}

function Header() {
  const { itemCount } = useCart();

  return (
    <header className="site-header">
      <Link to="/" className="brand">
        FORMA<span>.</span>
      </Link>

      <nav className="main-nav">
        <Link to="/">Shop</Link>
        <a href="/#collections">Collections</a>
        <Link to="/cart" className="cart-link">
          Bag <span className="cart-count">{itemCount}</span>
        </Link>
      </nav>
    </header>
  );
}

function ProductCard({ product }) {
  const { addToCart } = useCart();

  function handleImageError(event) {
    event.currentTarget.onerror = null;
    event.currentTarget.src = FALLBACK_IMAGE;
  }

  function handleAdd(event) {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product);
  }

  return (
    <article className="product-card">
      <div className="product-image-container">
        <Link
          to={`/products/${product.id}`}
          className="product-image-link"
          aria-label={`View ${product.name}`}
        >
          <img
            src={product.image || FALLBACK_IMAGE}
            alt={product.name}
            className="product-image"
            loading="lazy"
            onError={handleImageError}
          />
        </Link>

        <button
          type="button"
          className="add-to-cart-btn"
          aria-label={`Add ${product.name} to cart`}
          title="Add to bag"
          onClick={handleAdd}
        >
          +
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

function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All" ||
      product.category === activeCategory;

    const matchesSearch = [
      product.name,
      product.category,
      product.description,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase().trim());

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="page-content">
      <section className="hero-section">
        <div>
          <p className="eyebrow">THE FORMA COLLECTION</p>
          <h1>
            Good things, <em>well chosen.</em>
          </h1>
        </div>

        <p className="hero-description">
          Useful essentials for everyday rituals and spaces.
        </p>
      </section>

      <section className="shop-toolbar" id="collections">
        <div className="category-list" aria-label="Filter by category">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={`category-button ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <input
          className="search-input"
          type="search"
          placeholder="Search products..."
          aria-label="Search products"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </section>

      <div className="results-count">
        {filteredProducts.length}{" "}
        {filteredProducts.length === 1 ? "product" : "products"}
      </div>

      {filteredProducts.length > 0 ? (
        <section className="product-grid" aria-label="Products">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      ) : (
        <div className="empty-state">
          <h2>No products found</h2>
          <p>Try another search or choose a different category.</p>
          <button
            type="button"
            className="primary-button"
            onClick={() => {
              setSearchTerm("");
              setActiveCategory("All");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </main>
  );
}

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  if (!product) {
    return (
      <main className="page-content empty-state">
        <h2>Product not found</h2>
        <Link to="/" className="primary-button">
          Return to shop
        </Link>
      </main>
    );
  }

  return (
    <main className="page-content">
      <button
        type="button"
        className="back-button"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <section className="product-detail">
        <div className="detail-image-container">
          <img
            src={product.image || FALLBACK_IMAGE}
            alt={product.name}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = FALLBACK_IMAGE;
            }}
          />
        </div>

        <div className="detail-information">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="detail-rating">
            ★ {Number(product.rating || 0).toFixed(1)}
          </p>
          <p className="detail-price">{formatPrice(product.price)}</p>
          <p className="detail-description">
            {product.description || "A thoughtfully selected everyday essential."}
          </p>

          <button
            type="button"
            className="primary-button detail-add-button"
            onClick={() => {
              addToCart(product);
              navigate("/cart");
            }}
          >
            Add to bag — {formatPrice(product.price)}
          </button>

          <p className="detail-note">
            A considered addition to your everyday collection.
          </p>
        </div>
      </section>
    </main>
  );
}

function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    totalPrice,
    clearCart,
  } = useCart();

  const [checkoutMessage, setCheckoutMessage] = useState("");

  if (cartItems.length === 0) {
    return (
      <main className="page-content">
        <section className="empty-state cart-empty-state">
          <p className="eyebrow">YOUR BAG</p>
          <h1>Your bag is waiting.</h1>
          <p>Add something you love to see it here.</p>
          <Link to="/" className="primary-button">
            Continue shopping
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="page-content cart-page">
      <div className="cart-heading">
        <div>
          <p className="eyebrow">YOUR SELECTION</p>
          <h1>Your bag.</h1>
        </div>

        <button
          type="button"
          className="text-button"
          onClick={clearCart}
        >
          Clear bag
        </button>
      </div>

      <div className="cart-layout">
        <section className="cart-items">
          {cartItems.map((item) => (
            <article className="cart-item" key={item.id}>
              <img
                src={item.image || FALLBACK_IMAGE}
                alt={item.name}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = FALLBACK_IMAGE;
                }}
              />

              <div className="cart-item-information">
                <p className="cart-item-category">{item.category}</p>
                <h2>{item.name}</h2>
                <p>{formatPrice(item.price)}</p>

                <div className="quantity-control">
                  <button
                    type="button"
                    aria-label={`Decrease ${item.name} quantity`}
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    type="button"
                    aria-label={`Increase ${item.name} quantity`}
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cart-item-end">
                <strong>
                  {formatPrice(item.price * item.quantity)}
                </strong>
                <button
                  type="button"
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </section>

        <aside className="order-summary">
          <h2>Order summary</h2>

          <div className="summary-row">
            <span>Items</span>
            <span>
              {cartItems.reduce(
                (total, item) => total + item.quantity,
                0
              )}
            </span>
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <strong>{formatPrice(totalPrice)}</strong>
          </div>

          <button
            type="button"
            className="primary-button checkout-button"
            onClick={() =>
              setCheckoutMessage(
                "Demo checkout only. No payment has been processed."
              )
            }
          >
            Proceed to checkout
          </button>

          {checkoutMessage && (
            <p className="checkout-message" role="status">
              {checkoutMessage}
            </p>
          )}

          <Link to="/" className="continue-shopping">
            Continue shopping
          </Link>
        </aside>
      </div>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className="page-content empty-state">
      <h1>Page not found</h1>
      <Link to="/" className="primary-button">
        Back to shop
      </Link>
    </main>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <Link to="/" className="brand">
        FORMA<span>.</span>
      </Link>
      <p>Good things, well chosen.</p>
      <span>© {new Date().getFullYear()} FORMA</span>
    </footer>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <Header />

      <Routes>
        <Route path="/" element={<ShopPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </div>
  );
}