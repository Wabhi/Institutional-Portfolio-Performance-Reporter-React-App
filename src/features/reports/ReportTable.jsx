import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { selectAllReports, toggleSelection, fetchReports } from '../reports/reportSlice';

export const ReportTable = () => {
  const dispatch = useDispatch();
  
  const reports = useSelector(selectAllReports) || [];
  const status = useSelector((state) => state.reports?.status) || 'idle';
  const error = useSelector((state) => state.reports?.error) || null;
  const selectedIds = useSelector((state) => state.reports?.selectedIds) || [];
  const searchTerm = useSelector((state) => state.reports?.searchTerm) || '';
  const sectorFilter = useSelector((state) => state.reports?.sectorFilter) || 'All';

  const filteredReports = useMemo(() => {
    if (!Array.isArray(reports)) return [];
    
    return reports.filter(report => {
      const matchesSearch = 
        report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.ticker.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSector = 
        sectorFilter === 'All' || report.sector === sectorFilter;
      
      return matchesSearch && matchesSector;
    });
  }, [reports, searchTerm, sectorFilter]);

  const handleToggleSelection = (id) => {
    dispatch(toggleSelection(id));
  };

  const handleRetry = () => {
    dispatch(fetchReports());
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center py-12" data-testid="loading-spinner">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-3 text-lg text-gray-600">Loading reports...</span>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center" data-testid="error-message">
        <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-3" />
        <p className="text-red-800 mb-4">{error}</p>
        <button
          onClick={handleRetry}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          data-testid="retry-button"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-lg shadow" data-testid="report-table">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">
              <input type="checkbox" className="w-4 h-4" disabled />
            </th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Security Name</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Ticker</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Sector</th>
            <th className="px-4 py-3 text-right font-semibold text-gray-700">Portfolio Weight (%)</th>
            <th className="px-4 py-3 text-right font-semibold text-gray-700">Quarterly Return (%)</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map((report) => (
            <tr
              key={report.id}
              className={`border-b transition-colors ${
                selectedIds.includes(report.id) ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
              data-testid={`report-row-${report.id}`}
            >
              <td className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(report.id)}
                  onChange={() => handleToggleSelection(report.id)}
                  className="w-4 h-4 cursor-pointer accent-blue-600"
                  data-testid={`checkbox-${report.id}`}
                />
              </td>
              <td className="px-4 py-3 font-medium text-gray-900">{report.name}</td>
              <td className="px-4 py-3 text-gray-600 font-mono">{report.ticker}</td>
              <td className="px-4 py-3">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                  {report.sector}
                </span>
              </td>
              <td className="px-4 py-3 text-right text-gray-900">{report.weight.toFixed(2)}</td>
              <td className="px-4 py-3 text-right">
                <span className={`font-semibold ${
                  report.quarterlyReturn >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {report.quarterlyReturn >= 0 ? '+' : ''}{report.quarterlyReturn.toFixed(2)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {filteredReports.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No reports match your search criteria
        </div>
      )}
    </div>
  );
};