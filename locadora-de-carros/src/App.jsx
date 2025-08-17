import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import ReservationPage from './pages/ReservationPage';
import ConfirmationPage from './pages/ConfirmationPage';
import './App.css';

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header/>
      <main className="container mx-auto p-4">

        {/* O componente <Routes> gerencia qual <Route> será exibida */}
        <Routes>
          {/* Rota para a página inicial. path="/" mostra o componente HomePage */}
          <Route path="/" element={<DashboardPage />} />

          {/* Rota para a página de detalhes. O ":carId" é um parâmetro dinâmico */}
          <Route path="/nova-reserva" element={<ReservationPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>

      </main>
    </div>
  );
}

export default App;