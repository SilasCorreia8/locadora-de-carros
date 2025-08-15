import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ReservationPage() {
  // useNavigate é uma função que nos permite redirecionar o usuário
  const navigate = useNavigate();
  
  // useLocation nos dá acesso aos dados da navegação, incluindo o 'state' que passamos
  const location = useLocation();
  const car = location.state?.car; // Usamos '?' para o caso de alguém acessar a URL diretamente

  // Estado para controlar os dados do formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Função genérica para atualizar o estado do formulário
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Função chamada quando o formulário é enviado
  const handleSubmit = (event) => {
    event.preventDefault(); // Impede o recarregamento da página
    // Aqui é onde, no futuro, você enviaria os dados para um back-end
    console.log("Dados da reserva a serem enviados:", {
      carDetails: car,
      customerDetails: formData,
    });
    // Redireciona o usuário para a página de confirmação
    navigate('/confirmation');
  };

  // Se, por algum motivo, não houver dados do carro, mostramos uma mensagem de erro.
  if (!car) {
    return (
       <div className="text-center py-10">
        <h2 className="text-2xl font-bold">Erro: Nenhum carro selecionado para reserva.</h2>
        <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">
          Voltar para a busca
        </Link>
      </div>
    );
  }

  return (
    // Container principal da página de reserva
    <div className="max-w-2xl mx-auto my-8 p-8 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Formulário de Reserva</h1>
      <p className="text-gray-600 mb-6">Preencha seus dados para concluir a reserva.</p>

      {/* Seção de resumo do carro */}
      <div className="bg-gray-100 p-4 rounded-lg mb-8 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Você está reservando: {car.name}</h3>
        <p className="text-gray-600"><strong>Preço:</strong> R$ {car.pricePerDay.toFixed(2)} / dia</p>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nome Completo:
          </label>
          <input 
            type="text" 
            name="name" 
            id="name"
            value={formData.name} 
            onChange={handleChange} 
            required 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            E-mail:
          </label>
          <input 
            type="email" 
            name="email"
            id="email"
            value={formData.email} 
            onChange={handleChange} 
            required 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Telefone:
          </label>
          <input 
            type="tel" 
            name="phone" 
            id="phone"
            value={formData.phone} 
            onChange={handleChange} 
            required 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        
        <button 
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-lg"
        >
          Confirmar Reserva
        </button>
      </form>
    </div>
  );
}

export default ReservationPage;