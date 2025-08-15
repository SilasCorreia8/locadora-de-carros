import { Link } from 'react-router-dom';

function ConfirmationPage() {
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h2>Obrigado!</h2>
      <p>Sua reserva foi confirmada com sucesso.</p>
      <Link to="/">Voltar para a Página Inicial</Link>
    </div>
  );
}

export default ConfirmationPage;