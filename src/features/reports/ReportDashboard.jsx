import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RefreshCw } from 'lucide-react';
import { fetchReports } from './reportSlice';
import { ReportSearch } from '../reports/ReportSearch';
import { SectorFilter } from '../reports/SectotFilter';
import { ReportTable } from '../reports/ReportTable';
import { ReportSummary } from '../reports/ReportSummary';

export const ReportDashboard = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.reports.status);
  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchReports());
  };


  const isLoading = status === 'loading';

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Institutional Portfolio Performance Reporter
          </h1>
          <p className="text-gray-600 text-lg">
            Track and analyze your institutional holdings across multiple sectors
          </p>
        </header>

        <main className="bg-white rounded-lg shadow-lg p-6">

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Asset Performance Reports
            </h2>

            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className={`
                flex items-center gap-2 px-6 py-2 rounded-lg
                transition-all duration-200 font-medium
                ${isLoading
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg text-white'
                }
              `}
              data-testid="fetch-reports-button"
              aria-label="Fetch latest reports"
            >
              <RefreshCw
                className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`}
              />
              {isLoading ? 'Fetching...' : 'Fetch Latest Reports'}
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <ReportSearch />
            <SectorFilter />
          </div>

          <ReportTable />
          <ReportSummary />

        </main>
      </div>
    </div>
  );
};