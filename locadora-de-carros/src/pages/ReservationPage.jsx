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
    return <h2>Erro: Nenhum carro selecionado para reserva.</h2>;
  }

  return (
    <div className="reservation-page">
      <h1>Formulário de Reserva</h1>
      <div className="car-summary">
        <h3>Você está reservando: {car.name}</h3>
        <p><strong>Preço:</strong> R$ {car.pricePerDay.toFixed(2)} / dia</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Nome Completo:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          E-mail:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Telefone:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>
        <button type="submit">Confirmar Reserva</button>
      </form>
    </div>
  );
}

export default ReservationPage;