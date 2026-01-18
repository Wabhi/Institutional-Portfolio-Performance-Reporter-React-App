import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../reports/reportSlice';
import { useDebounce } from '../../hooks/useDebounce';

export const ReportSearch = () => {
  const dispatch = useDispatch(); 
  const [inputValue, setInputValue] = useState('');
  const debouncedSearch = useDebounce(inputValue, 300);

  useEffect(() => {
    dispatch(setSearchTerm(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search by Security Name or Ticker..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        data-testid="search-input"
      />
    </div>
  );
};