import { Link } from 'react-router-dom';

function CarCard({ car }) {
  return (
    // Envolva todo o card com o componente Link.
    // A prop 'to' define o destino. Usamos template string para criar a URL dinâmica.
    <Link to={`/car/${car.id}`} className="car-card-link">
      <div className="car-card">
        <img src={car.imageUrl} alt={`Imagem do ${car.name}`} />
        <h3>{car.name}</h3>
        <p>{car.type}</p>
        <p>
          <strong>R$ {car.pricePerDay.toFixed(2)}</strong> / dia
        </p>
      </div>
    </Link>
  );
}

export default CarCard;