
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="page-content empty-state">
      <p className="eyebrow">404 ERROR</p>
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist.</p>

      <Link to="/" className="primary-button">
        Return to shop
      </Link>
    </main>
  );
}
