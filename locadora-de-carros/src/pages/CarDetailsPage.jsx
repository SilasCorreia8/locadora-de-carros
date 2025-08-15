import { useParams, Link } from 'react-router-dom';
import { cars as allCars } from '../mockData';

function CarDetailsPage() {
  const { carId } = useParams();
  const car = allCars.find(c => c.id === parseInt(carId));

  if (!car) {
    return <h2>Carro não encontrado!</h2>;
  }

  return (
    <div className="car-details">
      <img src={car.imageUrl} alt={`Imagem do ${car.name}`} />
      <h1>{car.name}</h1>
      <p>{car.type}</p>
      <h2>R$ {car.pricePerDay.toFixed(2)} / dia</h2>
      {/* Transforme o botão em um Link.
          A prop 'state' é a forma de passar dados complexos (como nosso objeto 'car')
          para a próxima rota de forma "invisível" (não aparece na URL).
      */}
      <Link to="/reservation" state={{ car: car }}>
        <button>Reservar Agora</button>
      </Link>
    </div>
  );
}

export default CarDetailsPage;