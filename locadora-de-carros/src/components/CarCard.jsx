// A sintaxe ({ car }) é uma forma de pegar a propriedade 'car'
// diretamente do objeto de props que o componente recebe.
function CarCard({ car }) {
  return (
    <div className="car-card">
      <img src={car.imageUrl} alt={`Imagem do ${car.name}`} />
      <h3>{car.name}</h3>
      <p>{car.type}</p>
      <p>
        <strong>R$ {car.pricePerDay.toFixed(2)}</strong> / dia
      </p>
    </div>
  );
}

export default CarCard;