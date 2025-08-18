const API_BASE_URL = 'http://localhost:7772/api/v1';

// Função para buscar todos os veículos da API
export const fetchVehicles = async () => {
  const response = await fetch(`${API_BASE_URL}/vehicles`);
  if (!response.ok) {
    throw new Error('Falha ao buscar veículos');
  }
  return response.json();
};

// --- SIMULAÇÃO ---
// A API fornecida não tem um endpoint para listar todos os clientes.
// Vamos manter a simulação por enquanto, mas usando a estrutura de dados correta da API.
const mockCustomers = [
    { customerId: 'a1b2c3d4-e5f6-7890-1234-567890abcdef', name: 'Carlos Eduardo Montenegro', document: '12345678901', hasPendency: true, isSuspended: false },
    { customerId: 'f0e9d8c7-b6a5-4321-fedc-ba9876543210', name: 'Soluções em TI Ltda', document: '12345678000199', hasPendency: true, isSuspended: false },
    { customerId: '22222222-aaaa-bbbb-cccc-000000000002', name: 'Fernando Lima', document: '77788899900', hasPendency: false, isSuspended: false },
    { customerId: '33333333-aaaa-bbbb-cccc-000000000003', name: 'Pedro Almeida', document: '11122233344', hasPendency: true, isSuspended: true },
];

export const fetchCustomers = () => {
  return new Promise(resolve => setTimeout(() => resolve(mockCustomers), 500));
};
// --- FIM DA SIMULAÇÃO ---

// Função para criar uma nova reserva
export const createReservation = async (reservationData) => {
  const response = await fetch(`${API_BASE_URL}/reserve/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reservationData),
  });

  if (!response.ok) {
    // Se a resposta não for OK, lemos o corpo do erro para dar uma mensagem específica
    const errorData = await response.json();
    throw new Error(errorData.message || 'Ocorreu um erro ao criar a reserva.');
  }
  
  return response.json();
};