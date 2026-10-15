
export default function Footer() {
  return (
    <footer className="site-footer">
      <span className="brand">
        FORMA<span>.</span>
      </span>

      <p>
        Thoughtfully chosen essentials for everyday life.
      </p>

      <p>© {new Date().getFullYear()} FORMA</p>
    </footer>
  );
}
