import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CarDetailsPage from './pages/CarDetailsPage';
import './App.css';

function App() {
  return (
    <div>
      {/* O componente <Routes> gerencia qual <Route> será exibida */}
      <Routes>
        {/* Rota para a página inicial. path="/" mostra o componente HomePage */}
        <Route path="/" element={<HomePage />} />

        {/* Rota para a página de detalhes. O ":carId" é um parâmetro dinâmico */}
        <Route path="/car/:carId" element={<CarDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;