import CarCard from './CarCard';

// Recebe a lista de carros via props, com o nome 'cars'
function CarList({ cars }) {
  // Se a lista de carros estiver vazia, mostramos uma mensagem
  if (cars.length === 0) {
    return <p>Nenhum carro encontrado para os filtros selecionados.</p>;
  }

  return (
    <div className="car-list">
      {/* Mapeamos a lista recebida via props */}
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}

export default CarList;