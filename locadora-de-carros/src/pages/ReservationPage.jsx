import { useState, useMemo } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

// Função para calcular a diferença de dias entre duas datas.
function calculateDays(startDate, endDate) {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const difference = end.getTime() - start.getTime();
  const totalDays = Math.ceil(difference / (1000 * 3600 * 24));
  return totalDays <= 0 ? 1 : totalDays; // Mínimo de 1 dia de aluguel
}

function ReservationPage() {
  // useNavigate é uma função que nos permite redirecionar o usuário
  const navigate = useNavigate();
  
  // useLocation nos dá acesso aos dados da navegação, incluindo o 'state' que passamos
  const location = useLocation();
  
  const car = location.state?.car; // Usamos '?' para o caso de alguém acessar a URL diretamente

  const [dates, setDates] = useState({
    startDate: '',
    endDate: ''
  });

  // Estado para controlar os dados do formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Estado para guardar as mensagens de erro de cada campo.
  const [errors, setErrors] = useState({});

  // Calculo dos valores
  const { numberOfDays, totalPrice } = useMemo(() => {
    const days = calculateDays(dates.startDate, dates.endDate);
    const price = car ? car.pricePerDay * days : 0;
    return { numberOfDays: days, totalPrice: price };
  }, [dates, car]);

  // Função genérica para atualizar o estado do formulário
  const handleChange = (event) => {
    const { name, value } = event.target;
    // Atualiza tanto os dados do formulário quanto as datas
    if (name === 'startDate' || name === 'endDate') {
      setDates(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
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


    // Validação das datas
    if (!dates.startDate) {
      newErrors.startDate = 'A data de retirada é obrigatória.';
    }

    if (!dates.endDate) { 
      newErrors.endDate = 'A data de devolução é obrigatória.';
    }
    
    if (dates.startDate && dates.endDate && new Date(dates.endDate) < new Date(dates.startDate)) {
      newErrors.endDate = 'A data de devolução não pode ser anterior à de retirada.';
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
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Concluir Reserva</h1>
      
      <div className="bg-gray-100 p-4 rounded-lg mb-8 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">{car.name}</h3>
        <p className="text-gray-600">Preço por dia: R$ {car.pricePerDay.toFixed(2)}</p>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Campos de Data*/}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Data de Retirada</label>
            <input type="date" name="startDate" id="startDate" value={dates.startDate} onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${errors.startDate ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.startDate && <p className="mt-2 text-sm text-red-600">{errors.startDate}</p>}
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Data de Devolução</label>
            <input type="date" name="endDate" id="endDate" value={dates.endDate} onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${errors.endDate ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.endDate && <p className="mt-2 text-sm text-red-600">{errors.endDate}</p>}
          </div>
        </div>

        {/* Nomde Completo */}
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
        
        {/* E-mail */}
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

        {/* Telefone */}
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
        
        {/* Exibição do Valor Total */}
        {numberOfDays > 0 && (
          <div className="text-center bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600">Total de dias: {numberOfDays}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              Valor Total: R$ {totalPrice.toFixed(2)}
            </p>
          </div>
        )}

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