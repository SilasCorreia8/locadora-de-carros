import CarCard from './CarCard';

// Recebe a lista de carros via props, com o nome 'cars'
function CarList({ cars }) {
  // Se a lista de carros estiver vazia, mostramos uma mensagem
  if (cars.length === 0) {
    return <p className="text-center text-gray-500 mt-8">Nenhum carro encontrado para os filtros selecionados.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
      {/* Mapeamos a lista recebida via props */}
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}

export default CarList;