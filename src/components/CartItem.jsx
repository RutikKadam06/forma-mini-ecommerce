
import ProductImage from "./ProductImage";
import QuantityControl from "./QuantityControl";
import { formatPrice } from "../utils/formatPrice";

export default function CartItem({
  item,
  onRemove,
  onQuantityChange,
}) {
  return (
    <article className="cart-item">
      <ProductImage
        src={item.image}
        alt={item.name}
        className="cart-item-image"
      />

      <div className="cart-item-information">
        <p className="cart-item-category">{item.category}</p>
        <h2>{item.name}</h2>
        <p>{formatPrice(item.price)} each</p>

        <QuantityControl
          quantity={item.quantity}
          label={`Quantity for ${item.name}`}
          onDecrease={() =>
            onQuantityChange(item.id, item.quantity - 1)
          }
          onIncrease={() =>
            onQuantityChange(item.id, item.quantity + 1)
          }
        />
      </div>

      <div className="cart-item-end">
        <strong>
          {formatPrice(item.price * item.quantity)}
        </strong>

        <button
          type="button"
          className="remove-button"
          onClick={() => onRemove(item.id)}
        >
          Remove
        </button>
      </div>
    </article>
  );
}
