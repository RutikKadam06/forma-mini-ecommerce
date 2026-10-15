
export default function QuantityControl({
  quantity,
  onDecrease,
  onIncrease,
  label = "Quantity",
}) {
  return (
    <div className="quantity-control" aria-label={label}>
      <button
        type="button"
        onClick={onDecrease}
        aria-label="Decrease quantity"
      >
        −
      </button>

      <span aria-live="polite">{quantity}</span>

      <button
        type="button"
        onClick={onIncrease}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
