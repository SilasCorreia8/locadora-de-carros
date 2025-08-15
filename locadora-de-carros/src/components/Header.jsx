import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg sm:text-xl font-bold hover:text-gray-300">
          Carros.com
        </Link>
        <nav>
          <Link to="/login" className="hover:text-gray-300">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;