import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* font-bold, text-xl: Deixa o texto em negrito e grande. */}
        <Link to="/" className="text-xl font-bold hover:text-gray-300">
          Carros.com
        </Link>
        <nav>
          {/* Adicionamos um link simples de "Login" para o futuro */}
          <Link to="/login" className="hover:text-gray-300">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;