
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import products from "../data/products.json";
import ProductCard from "../components/ProductCard";

const categories = [
  "All",
  "Home",
  "Accessories",
  "Workspace",
  "Technology",
];

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get("category") || "All";
  const searchTerm = searchParams.get("search") || "";

  function updateFilter(key, value) {
    const next = new URLSearchParams(searchParams);

    if (!value || (key === "category" && value === "All")) {
      next.delete(key);
    } else {
      next.set(key, value);
    }

    setSearchParams(next, { replace: true });
  }

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const categoryMatches =
        activeCategory === "All" ||
        product.category === activeCategory;

      const searchableText = [
        product.name,
        product.category,
        product.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return categoryMatches && searchableText.includes(query);
    });
  }, [activeCategory, searchTerm]);

  const returnTo = `/${searchParams.toString()
    ? `?${searchParams.toString()}`
    : ""}`;

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
          Thoughtfully chosen essentials for everyday rituals and spaces.
        </p>
      </section>

      <section className="shop-toolbar" id="collections">
        <div className="category-list" aria-label="Product categories">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={`category-button ${
                activeCategory === category ? "active" : ""
              }`}
              aria-pressed={activeCategory === category}
              onClick={() => updateFilter("category", category)}
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
          onChange={(event) =>
            updateFilter("search", event.target.value)
          }
        />
      </section>

      <p className="results-count" aria-live="polite">
        {filteredProducts.length} products
      </p>

      {filteredProducts.length > 0 ? (
        <section className="product-grid" aria-label="Products">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              returnTo={returnTo}
            />
          ))}
        </section>
      ) : (
        <section className="empty-state">
          <h2>No products found</h2>
          <p>Try another search term or choose a different category.</p>

          <button
            type="button"
            className="primary-button"
            onClick={() => setSearchParams({})}
          >
            Clear filters
          </button>
        </section>
      )}
    </main>
  );
}
