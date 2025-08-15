import { useState } from 'react'; //Importe o useState
import { cars as allCars } from './mockData'; // Renomea 'cars' para 'allCars'
import CarList from './components/CarList';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  // Estado para guardar a lista de carros que será exibida
  const [filteredCars, setFilteredCars] = useState(allCars);

  // Função que o App vai usar para filtrar os carros
  // Ela recebe o tipo de carro selecionado no SearchBar
  const handleFilterChange = (carType) => {
    // Se nenhum tipo for selecionado (string vazia), mostra todos os carros
    if (!carType) {
      setFilteredCars(allCars);
    } else {
      // Filtra o array original de carros
      const filtered = allCars.filter(car => car.type === carType);
      setFilteredCars(filtered);
    }
  };

  return (
    <div>
      <h1>Carros Disponíveis</h1>
      {/* Passa a função para o SearchBar via props */}
      <SearchBar onFilterChange={handleFilterChange} />
      <main>
        {/* Passamos a lista JÁ FILTRADA para o CarList */}
        <CarList cars={filteredCars} />
      </main>
    </div>
  );
}

export default App;