
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export default function Header() {
  const { itemCount } = useCart();

  return (
    <header className="site-header">
      <Link to="/" className="brand" aria-label="FORMA home">
        FORMA<span>.</span>
      </Link>

      <nav className="main-nav" aria-label="Main navigation">
        <Link to="/">Shop</Link>
        <Link to="/#collections">Collections</Link>
        <Link to="/cart" className="cart-link">
          Bag
          <span className="cart-count" aria-live="polite">
            {itemCount}
          </span>
        </Link>
      </nav>
    </header>
  );
}
