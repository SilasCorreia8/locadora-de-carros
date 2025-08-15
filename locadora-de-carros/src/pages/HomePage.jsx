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
    <div>
      <SearchBar onFilterChange={handleFilterChange} />
      <CarList cars={filteredCars} />
    </div>
  );
}

export default HomePage;