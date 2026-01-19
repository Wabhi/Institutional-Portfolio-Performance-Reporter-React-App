import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAllReports } from '../reports/reportSlice';

export const ReportSummary = () => {
  const reports = useSelector(selectAllReports); 
  const selectedIds = useSelector((state) => state.reports.selectedIds); 

  const { totalWeight, weightedAvgReturn } = useMemo(() => {
    const selectedReports = reports.filter(r => selectedIds.includes(r.id));

    const totalWeight = selectedReports.reduce((sum, r) => sum + r.weight, 0);
    const weightedAvgReturn = selectedReports.length > 0
      ? selectedReports.reduce((sum, r) => sum + (r.quarterlyReturn * r.weight), 0) / totalWeight
      : 0;

    return { totalWeight, weightedAvgReturn };
  }, [reports, selectedIds]);

  if (selectedIds.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200" data-testid="report-summary" >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Selected Portfolio Summary ({selectedIds.length} securities)
      </h3>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-600 mb-1">Total Portfolio Weight</p>
          <p className="text-3xl font-bold text-blue-600" data-testid="total-weight">
            {totalWeight.toFixed(2)}%
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">Weighted Average Return</p>
          <p 
            className={`text-3xl font-bold ${
              weightedAvgReturn >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
            data-testid="weighted-avg-return"
          >
            {weightedAvgReturn >= 0 ? '+' : ''}{weightedAvgReturn.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
};