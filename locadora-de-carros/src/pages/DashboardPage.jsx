import { Link } from 'react-router-dom';

function DashboardPage() {
  return (
    <div className="text-center p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Painel do Funcionário</h1>
      <div className="flex justify-center gap-8">
        <Link to="/nova-reserva" className="bg-blue-600 text-white font-bold py-6 px-10 rounded-lg hover:bg-blue-700 transition-colors text-xl shadow-lg">
          Iniciar Nova Reserva
        </Link>
        <button className="bg-gray-200 text-gray-600 font-bold py-6 px-10 rounded-lg cursor-not-allowed" disabled>
          Gerenciar Clientes (Em Breve)
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;