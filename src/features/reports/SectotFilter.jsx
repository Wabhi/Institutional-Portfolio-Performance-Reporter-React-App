import React from "react"
const SectorFilter = () => {
    const { state, dispatch } = useStore();
    const sectors = ['All', 'Technology', 'Energy', 'Healthcare'];
  
    return (
      <div className="mb-6 flex gap-2">
        {sectors.map(sector => (
          <button
            key={sector}
            onClick={() => dispatch({ type: 'reports/setSectorFilter', payload: sector })}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              state.sectorFilter === sector
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            data-testid={`sector-${sector.toLowerCase()}`}
          >
            {sector}
          </button>
        ))}
      </div>
    );
  };

  export default SectorFilter;