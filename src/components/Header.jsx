import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const linkClasses = (path) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
      location.pathname === path
        ? "bg-cyan-500/20 text-cyan-300 shadow shadow-cyan-500/20"
        : "text-gray-400 hover:text-white hover:bg-white/5"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-black via-[#050b18] to-black border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-cyan-400"
          >
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
          </svg>

          <span className="text-xl font-bold text-white">
            Wallet<span className="text-cyan-400">Rep</span>
          </span>
        </div>

        {/* Nav */}
        <nav className="flex gap-2">
          <Link to="/" className={linkClasses("/")}>
            Home
          </Link>
          <Link to="/bulk" className={linkClasses("/bulk")}>
            Bulk Check
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
