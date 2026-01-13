import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const linkClasses = (path) =>
    `px-4 py-2 rounded-md font-medium ${
      location.pathname === path
        ? "bg-teal-500 text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <header className="bg-white shadow-md p-4 flex justify-center space-x-4">
      <Link to="/" className={linkClasses("/")}>
        Home
      </Link>
      <Link to="/bulk" className={linkClasses("/bulk")}>
        Bulk Check
      </Link>
    </header>
  );
}

export default Header;
