import React, { useState, useEffect } from "react"

const ReportSearch = () => {
    const { state, dispatch } = useStore();
    const [inputValue, setInputValue] = useState('');
    const debouncedSearch = useDebounce(inputValue, 300);

    useEffect(() => {
        dispatch({ type: 'reports/setSearchTerm', payload: debouncedSearch });
    }, [debouncedSearch, dispatch]);

    return (
        <div className="mb-4">
            <input
                type="text"
                placeholder="Search by Security Name or Ticker..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                data-testid="search-input"
            />
        </div>
    );
};

export default ReportSearch;