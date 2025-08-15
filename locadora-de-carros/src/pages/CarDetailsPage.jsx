import { useParams } from 'react-router-dom'; // Hook para pegar parâmetros da URL
import { cars as allCars } from '../mockData'; // Importa nossos dados

function CarDetailsPage() {
  // O hook useParams() retorna um objeto com os parâmetros da URL.
  // Nossa rota será "/car/:carId", então ele retornará { carId: "1" }
  const { carId } = useParams();

  // Usamos o .find() para procurar o carro no nosso array de dados.
  // O `carId` vem da URL como string, então convertemos para número com `parseInt`.
  const car = allCars.find(c => c.id === parseInt(carId));

  // Se o carro não for encontrado (URL inválida), mostramos uma mensagem.
  if (!car) {
    return <h2>Carro não encontrado!</h2>;
  }

  // Se encontramos o carro, exibimos seus detalhes.
  return (
    <div className="car-details">
      <img src={car.imageUrl} alt={`Imagem do ${car.name}`} />
      <h1>{car.name}</h1>
      <p>{car.type}</p>
      <h2>R$ {car.pricePerDay.toFixed(2)} / dia</h2>
      <button>Reservar Agora</button>
    </div>
  );
}

export default CarDetailsPage;