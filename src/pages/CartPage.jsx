
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import CartItem from "../components/CartItem";
import { formatPrice } from "../utils/formatPrice";
export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
  } = useCart();

  const [checkoutMessage, setCheckoutMessage] = useState("");

  function handleCheckout() {
    setCheckoutMessage(
      "Demo checkout only. No payment or order has been processed."
    );
  }

  return (
    <main className="page-content cart-page">
      <div className="cart-heading">
        <h1>Your bag</h1>

        {cartItems.length > 0 && (
          <button
            type="button"
            className="text-button"
            onClick={() => {
              clearCart();
              setCheckoutMessage("");
            }}
          >
            Clear bag
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <section className="empty-state cart-empty-state">
          <h2>Your bag is empty</h2>
          <p>Discover something useful for your everyday routine.</p>

          <Link to="/" className="primary-button">
            Continue shopping
          </Link>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-items" aria-label="Items in your bag">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={(id) => {
                  removeFromCart(id);
                  setCheckoutMessage("");
                }}
                onQuantityChange={(id, quantity) => {
                  updateQuantity(id, quantity);
                  setCheckoutMessage("");
                }}
              />
            ))}
          </section>

          <aside className="order-summary">
            <h2>Order summary</h2>

            <div className="summary-row">
              <span>Items</span>
              <span>
                {cartItems.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                )}
              </span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>

            <div className="summary-total">
              <span>Subtotal</span>
              <strong>{formatPrice(totalPrice)}</strong>
            </div>

            <button
              type="button"
              className="primary-button checkout-button"
              onClick={handleCheckout}
            >
              Continue to checkout
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
      )}
    </main>
  );
}
