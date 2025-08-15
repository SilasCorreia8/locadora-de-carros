import { useState } from 'react';

// Recebe a função 'onFilterChange' via props
function SearchBar({ onFilterChange }) {
  // Cria um estado para guardar o valor do tipo de carro selecionado
  const [carType, setCarType] = useState('');

  // Esta função será chamada toda vez que o 'select' mudar
  const handleTypeChange = (event) => {
    const newType = event.target.value;
    setCarType(newType); // Atualiza o estado local
    onFilterChange(newType); // Chama a função do componente pai (App) com o novo valor
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* As datas ainda não são funcionais, focaremos no filtro por tipo */}
        
        {/* Campo de Data de Retirada */}
        <div>
          <label htmlFor="retirada" className="block text-sm font-medium text-gray-700">
            Data de Retirada
          </label>
          <input
            type="date"
            id="retirada"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {/* Campo de Data de Devolução */}
        <div>
          <label htmlFor="devolucao" className="block text-sm font-medium text-gray-700">
            Data de Devolução
          </label>
          <input
            type="date"
            id="devolucao"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>


        {/* Campo de Tipo de Carro */}
        <div>
          <label htmlFor="carType" className="block text-sm font-medium text-gray-700">
            Tipo de Carro:
            {/* Conecta o estado ao select */}
          </label>
          <select
            id="carType"
            value={carType}
            onChange={handleTypeChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Todos os Tipos</option>
            <option value="Econômico">Econômico</option>
            <option value="Econômico com A/C">Econômico com A/C</option>
            <option value="SUV">SUV</option>
            <option value="Picape">Picape</option>
          </select>
        </div>

        {/* Botão de Busca */}
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Buscar
        </button>

      </form>
    </div>
  );
}

export default SearchBar;