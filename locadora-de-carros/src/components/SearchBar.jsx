import { useState } from 'react';

// Recebe a função 'onFilterChange' via props
function SearchBar({ onFilterChange,}) {
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
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
      
        {/* Campo de Tipo de Carro */}
        <div>
          <label htmlFor="carType" className="block text-sm font-medium text-gray-700">
            Filtrar por Tipo de Carro
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

        {/* Botão de Filtrar */}
        <button
          type="button"
          className="bg-gray-800 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-700"
        >
          Filtrar
        </button>

      </form>
    </div>
  );
}

export default SearchBar;