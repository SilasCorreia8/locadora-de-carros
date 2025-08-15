import { useState } from 'react';
import { cars as allCars } from '../mockData';
import CarList from '../components/CarList';
import SearchBar from '../components/SearchBar';

function HomePage() {
  const [filteredCars, setFilteredCars] = useState(allCars);

  const handleFilterChange = (carType) => {
    if (!carType) {
      setFilteredCars(allCars);
    } else {
      const filtered = allCars.filter(car => car.type === carType);
      setFilteredCars(filtered);
    }
  };

  return (
    <>
      <h1>Carros Disponíveis</h1>
      <SearchBar onFilterChange={handleFilterChange} />
      <main>
        <CarList cars={filteredCars} />
      </main>
    </>
  );
}

export default HomePage;