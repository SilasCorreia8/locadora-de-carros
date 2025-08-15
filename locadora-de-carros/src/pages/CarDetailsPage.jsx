import { useParams, Link } from 'react-router-dom';
import { cars as allCars } from '../mockData';

function CarDetailsPage() {
  const { carId } = useParams();
  const car = allCars.find(c => c.id === parseInt(carId));

  if (!car) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold">Carro não encontrado!</h2>
        <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">
          Voltar para a busca
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white max-w-4xl mx-auto my-8 p-8 rounded-lg shadow-xl">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        
        {/* Coluna da Imagem */}
        <div>
          <img 
            src={car.imageUrl} 
            alt={`Imagem do ${car.name}`} 
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="flex flex-col h-full">
          <p className="text-sm text-gray-500 uppercase tracking-widest">{car.type}</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{car.name}</h1>
          
          <div className="mt-auto"> {/* Este div empurra o preço e o botão para baixo */}
            <p className="text-3xl font-light text-gray-800 mb-6">
              <strong className="font-bold">R$ {car.pricePerDay.toFixed(2)}</strong>
              <span className="text-lg font-normal text-gray-500"> / dia</span>
            </p>
            
            {/* Transforme o botão em um Link.
            A prop 'state' é a forma de passar dados complexos (como nosso objeto 'car')
            para a próxima rota de forma "invisível" (não aparece na URL).
            */}
            <Link to="/reservation" state={{ car: car }}>
              <button className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors text-lg">
                Reservar Agora
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CarDetailsPage;