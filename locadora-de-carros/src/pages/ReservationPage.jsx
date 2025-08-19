import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchVehicles, fetchCustomers, createReservation } from '../services/api';

// Função para calcular a diferença de dias entre duas datas.
function calculateDays(startDate, endDate) {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (start > end) return 0; // Impede cálculo com data final anterior à inicial
  const difference = end.getTime() - start.getTime();
  const totalDays = Math.ceil(difference / (1000 * 3600 * 24));
  return totalDays === 0 ? 1 : totalDays; // Mínimo de 1 dia de aluguel
}

function ReservationPage() {
  // useNavigate é uma função que nos permite redirecionar o usuário
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Estado para guardar erros da API

  // Guarda o cliente que o funcionário selecionou. Inicia como nulo.
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  // Guarda o carro que o funcionário selecionou. Inicia como nulo.
  const [selectedCar, setSelectedCar] = useState(null);
  // Guarda as datas da reserva.
  const [dates, setDates] = useState({ startDate: '', endDate: '' }); 

  // Estado para guardar as mensagens de erro de cada campo.
  const [formErrors, setFormErrors] = useState({});

  // Capturar data de hoje
  // Cria uma string com a data de hoje no formato YYYY-MM-DD,
  // que é o formato que o atributo 'min' do input de data exige.
  const today = new Date().toISOString().split('T')[0];

  // 'useEffect' 
  useEffect(() => {
    const loadData = async () => {
      try {
        const [fetchedVehicles, fetchedCustomers] = await Promise.all([
          fetchVehicles(),
          fetchCustomers() // Usando a simulação por enquanto
        ]);
        
        // Adaptamos os dados da API para o formato que nosso front-end espera
        const adaptedCars = fetchedVehicles.map(car => ({
            ...car,
            pricePerDay: car.dailyRateInCents / 100, // Convertendo centavos
            name: car.modelName
        }));

        setCars(adaptedCars);
        setCustomers(fetchedCustomers);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  {/* --- Calculo dos valores --- */}

  // 'useMemo' recalcula o valor total apenas quando uma das dependências (datas, carro) muda.
  const { numberOfDays, totalPrice } = useMemo(() => {
    const days = calculateDays(dates.startDate, dates.endDate);
    const price = selectedCar ? selectedCar.pricePerDay * days : 0;
    return { numberOfDays: days, totalPrice: price };
  }, [dates, selectedCar]);

  // Função executada quando o funcionário seleciona um cliente no dropdown.
  // A função agora recebe o evento completo para poder resetar a seleção.
  const handleCustomerSelect = (event) => {
    const customerId = event.target.value;
    if (!customerId) return;
    const customer = customers.find(c => c.customerId === customerId);
    
    // As validações da API (hasPendency, isSuspended) acontecerão no backend.
    // O front-end pode dar um aviso prévio.
    if (customer.hasPendency) {
      alert(`Atenção: Cliente ${customer.name} possui pendências financeiras!`);
    }
     if (customer.isSuspended) {
      alert(`Atenção: Cliente ${customer.name} está suspenso! A reserva pode falhar.`);
    }
    
    setSelectedCustomer(customer);
    setSelectedCar(null);
  };

  // Função executada quando o funcionário clica em um carro na lista.
  const handleCarSelect = (car) => { 
    if (car.vehicleStatus !== 'AVAILABLE') {
      alert(`Este veículo (${car.name}) não está disponível para reserva no momento. Status: ${car.vehicleStatus}`);
      return;
    }
    setSelectedCar(car);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Função para atualizar o estado das datas.
  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setDates(prev => ({ ...prev, [name]: value }));
  };

  // Função para verificar os dados do formulário e retornar um objeto com os erros.
  const validateForm = () => {
    const newErrors = {};

    // Valida se um carro foi selecionado.
    if (!selectedCar) {
      newErrors.car = 'É necessário selecionar um carro para a reserva.';
    }

    // Validação das datas (lógica mantida).
    if (!dates.startDate) newErrors.startDate = 'A data de retirada é obrigatória.';
    else if (dates.startDate < today) newErrors.startDate = 'A data de retirada não pode ser no passado.';
    if (!dates.endDate) newErrors.endDate = 'A data de devolução é obrigatória.';
    else if (dates.endDate < dates.startDate) newErrors.endDate = 'A data de devolução não pode ser anterior à de retirada.';
    
    return newErrors;
  };   

  // Função chamada quando o formulário é enviado.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const localErrors = validateForm();
    if (Object.keys(localErrors).length > 0) {
      setFormErrors(localErrors);
      if (localErrors.car) alert(localErrors.car);
      return; // Impede o envio se houver erros locais
    }

    setFormErrors({});

    const reservationPayload = {
      customerData: {
        name: selectedCustomer.name,
        document: selectedCustomer.document
      },
      vehicleData: {
        modelName: selectedCar.modelName,
        year: selectedCar.year,
        licensePlate: selectedCar.licensePlate
      },
      rentalDate: dates.startDate,
      returnDate: dates.endDate
    };

    try {
      // Chamada à função da nossa camada de serviço
      await createReservation(reservationPayload);
      // Se a reserva for bem-sucedida, redireciona
      navigate('/confirmation');
    } catch (apiError) {
      // Se a API retornar um erro (ex: cliente com pendência), exibimos a mensagem
      alert(`Erro ao criar reserva: ${apiError.message}`);
      setFormErrors({ api: apiError.message });
    }
    
  };

  if (isLoading) return <div className="text-center p-8 text-xl font-semibold">Carregando dados da API...</div>;
  if (error) return <div className="text-center p-8 text-xl text-red-600">Erro ao carregar dados: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto my-8">
      {/* SEÇÃO DE FINALIZAÇÃO
          Esta seção só aparece quando um carro é selecionado e fica fixa no topo
          para que o funcionário possa preencher as datas e finalizar a reserva. */}
      {selectedCar && (
        <form onSubmit={handleSubmit} className="sticky top-4 z-10 bg-blue-100 border-l-4 border-blue-500 p-6 rounded-lg shadow-xl mb-8">
           <h2 className="text-2xl font-bold mb-4">Passo 3: Período e Finalização</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
              {/* Resumo da seleção */}
              <div className="lg:col-span-1">
                <p><strong>Cliente:</strong> {selectedCustomer.name}</p>
                <p><strong>Carro:</strong> {selectedCar.name}</p>
              </div>
              {/* Campos de Data */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:col-span-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium">Data de Locação</label>
                  <input type="date" name="startDate" id="startDate" value={dates.startDate} onChange={handleDateChange} min={today}
                    className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${formErrors.startDate ? 'border-red-500' : 'border-gray-300'}`} />
                  {formErrors.startDate && <p className="mt-1 text-xs text-red-600">{formErrors.startDate}</p>}
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium">Data de Devolução</label>
                  <input type="date" name="endDate" id="endDate" value={dates.endDate} onChange={handleDateChange} min={dates.startDate || today}
                    className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${formErrors.endDate ? 'border-red-500' : 'border-gray-300'}`} />
                  {formErrors.endDate && <p className="mt-1 text-xs text-red-600">{formErrors.endDate}</p>}
                </div>
              </div>
              {/* Valor Total e Botão */}
              <div className="lg:col-span-1 flex flex-col items-center justify-center">
                {numberOfDays > 0 && (
                  <p className="text-xl font-bold text-gray-800">
                    Total: R$ {totalPrice.toFixed(2)}
                  </p>
                )}
                <button type="submit" className="w-full mt-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">
                  Finalizar Reserva
                </button>
              </div>
           </div>
        </form>
      )}

      {/* SEÇÃO DE SELEÇÃO DE CLIENTE */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">Passo 1: Selecione o Cliente</h2>
        <select onChange={handleCustomerSelect} defaultValue="">
          <option value="" disabled>Selecione um cliente...</option>
          {customers.map(customer => (
            <option key={customer.customerId} value={customer.customerId}>
              {customer.name} {customer.hasPendency ? '(Com Pendências)' : ''} {customer.isSuspended ? '(Suspenso)' : ''}
            </option>
          ))}
        </select>
      </div>

      {/* SEÇÃO DE SELEÇÃO DE CARRO
          Esta seção só aparece quando um cliente já foi selecionado. */}
      {selectedCustomer && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Passo 2: Selecione o Carro para <span className="text-blue-600">{selectedCustomer.name}</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map(car => (
              // O card só é clicável se o carro estiver disponível
              <div key={car.vehicleId} onClick={() => handleCarSelect(car)} className={car.vehicleStatus === 'AVAILABLE' ? 'cursor-pointer' : 'cursor-not-allowed'}>
                {/* Opacidade para carros indisponíveis */}
                <div className={`flex flex-col h-full rounded-lg shadow-md overflow-hidden transition-all duration-300 ${selectedCar?.vehicleId === car.vehicleId ? 'ring-4 ring-blue-500 scale-105' : 'hover:shadow-xl hover:scale-105'} ${car.vehicleStatus !== 'AVAILABLE' ? 'opacity-50' : ''}`}>
                  <img src={car.imageUrl || 'https://i.imgur.com/8N4e6c2.png'} alt={car.name} className="w-full h-48 object-cover" />
                  <div className="p-4 text-center flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-gray-800">{car.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{car.licensePlate}</p>
                    
                    {/* Container para os detalhes extras */}
                    <div className="text-left text-sm text-gray-600 space-y-1 my-4 border-t border-b py-2">
                      <p><strong>Ano:</strong> {car.year}</p>
                      <p><strong>Cor:</strong> {car.color}</p>
                      <p><strong>Combustível:</strong> {car.fuel}</p>
                      <p><strong>Portas:</strong> {car.doors}</p>
                      <p><strong>Km:</strong> {car.mileage}</p>
                      <p><strong>Placa:</strong> {car.licensePlate}</p>
                      <p><strong>Status:</strong> 
                        <span className={`font-bold ${
                          car.vehicleStatus === 'AVAILABLE' ? 'text-green-600' : 
                          car.vehicleStatus === 'RESERVED' ? 'text-orange-500' : 'text-red-600'
                        }`}>
                          {car.vehicleStatus}
                        </span>
                      </p>
                    </div>

                    <div className="mt-auto">
                      <p className="text-xl font-bold text-gray-900">
                        R$ {car.pricePerDay.toFixed(2)}
                        <span className="text-sm font-normal text-gray-500"> / dia</span>
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ReservationPage;