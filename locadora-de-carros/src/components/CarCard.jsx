import { Link } from 'react-router-dom';

function CarCard({ car }) {
  return (
    // Envolva todo o card com o componente Link.
    // A prop 'to' define o destino. Usamos template string para criar a URL dinâmica.
    <Link to={`/car/${car.id}`} state={{ car: car }} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
        
        <img 
          src={car.imageUrl}
          alt={`Imagem do ${car.name}`} 
          className="w-full h-48 object-cover"
        />
        <div className="p-4 text-center">
          <h3 className="text-lg font-bold text-gray-800">{car.name}</h3>
          <p className="text-sm text-gray-500">{car.type}</p>
          <p className="mt-4 text-xl font-bold text-gray-900">
            R$ {car.pricePerDay.toFixed(2)}
            <span className="text-sm font-normal text-gray-500"> / dia</span>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default CarCard;