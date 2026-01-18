import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSectorFilter } from '../reports/reportSlice';

export const SectorFilter = () => {
  const dispatch = useDispatch(); 
  const sectorFilter = useSelector((state) => state.reports.sectorFilter);
  
  const sectors = ['All', 'Technology', 'Energy', 'Healthcare'];

  return (
    <div className="mb-6 flex gap-2">
      {sectors.map(sector => (
        <button
          key={sector}
          onClick={() => dispatch(setSectorFilter(sector))} 
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            sectorFilter === sector
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