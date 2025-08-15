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

  // Estado para guardar as mensagens de erro de cada campo.
  const [errors, setErrors] = useState({});

  // Função genérica para atualizar o estado do formulário
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Função para verificar os dados do formulário e retornar um objeto com os erros.
  const validateForm = () => {
    const newErrors = {};

    // Validação do nome
    if (!formData.name.trim()) {
      newErrors.name = 'O nome completo é obrigatório.';
    }

    // Validação do e-mail
    if (!formData.email) {
      newErrors.email = 'O e-mail é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      // Regex simples para verificar o formato do e-mail
      newErrors.email = 'O formato do e-mail é inválido.';
    }

    // Validação do telefone
    if (!formData.phone) {
      newErrors.phone = 'O telefone é obrigatório.';
    } else if (!/^\d{10,11}$/.test(formData.phone.replace(/\D/g, ''))) {
      // Regex para aceitar números de 10 ou 11 dígitos (com ou sem DDD)
      newErrors.phone = 'O telefone deve conter 10 ou 11 dígitos.';
    }

    return newErrors;
  };

  // Função chamada quando o formulário é enviado
  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validateForm();

    // Se o objeto de erros tiver qualquer chave (ou seja, se houver erros)...
    if (Object.keys(formErrors).length > 0) {
      // ...atualizamos o estado de erros para exibi-los na tela e paramos a execução.
      setErrors(formErrors);
    } else {
      // Se não houver erros, limpamos qualquer erro antigo e prosseguimos.
      setErrors({});
      console.log("Dados da reserva válidos e a serem enviados:", {
        carDetails: car,
        customerDetails: formData,
      });
      navigate('/confirmation');
    }
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
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
          />
          {/* Exibição da menssagem de erro */}
          {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
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
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
          />
          {/* Exibição da menssagem de erro */}
          {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
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
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
          />
          {/* Exibição da menssagem de erro */}
          {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
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