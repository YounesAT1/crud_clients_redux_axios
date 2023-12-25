import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-slate-800 py-4">
      <nav className="container mx-auto">
        <ul className="flex justify-start space-x-6">
          <li>
            <Link
              to="/"
              className="font-semibold text-xl text-white hover:text-gray-300 transition duration-300"
            >
              Clients
            </Link>
          </li>
          <li>
            <Link
              to="/clients/add"
              className="text-xl font-semibold text-white hover:text-gray-300 transition duration-300"
            >
              Add a client
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
