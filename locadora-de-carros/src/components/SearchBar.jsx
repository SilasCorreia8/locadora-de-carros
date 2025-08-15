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
    <div className="search-bar">
      <form>
        {/* As datas ainda não são funcionais, focaremos no filtro por tipo */}
        <label>
          Data de Retirada:
          <input type="date" />
        </label>
        <label>
          Data de Devolução:
          <input type="date" />
        </label>
        <label>
          Tipo de Carro:
          {/* Conecta o estado ao select */}
          <select value={carType} onChange={handleTypeChange}>
            <option value="">Todos os Tipos</option>
            <option value="Econômico">Econômico</option>
            <option value="Econômico com A/C">Econômico com A/C</option>
            <option value="SUV">SUV</option>
          </select>
        </label>
      </form>
    </div>
  );
}

export default SearchBar;