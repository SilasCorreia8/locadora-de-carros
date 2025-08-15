import { Link } from 'react-router-dom';

function ConfirmationPage() {
  return (
    <div className="bg-white max-w-4xl mx-auto my-8 p-8 rounded-lg shadow-xl text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-3">Obrigado!</h2>
      <p className="text-gray-600 mb-8">Sua reserva foi confirmada com sucesso.</p>
      <Link 
        to="/" 
        className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Voltar para a Página Inicial
      </Link>
    </div>
    
  );
}

export default ConfirmationPage;