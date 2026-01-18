import React from "react"
import ReportSearch from "./ReportSearch";
import SectorFilter from "./SectotFilter";
import ReportSummary from "./ReportSummary";
import ReportTable from "./ReportTable";

const ReportDashboard = () => {
    const { dispatch } = useStore();

    useEffect(() => {
        handleFetchReports(dispatch);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Institutional Portfolio Performance Reporter
                    </h1>
                    <p className="text-gray-600">
                        Track and analyze your institutional holdings across multiple sectors
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800">Asset Performance Reports</h2>
                        <button
                            onClick={() => handleFetchReports(dispatch)}
                            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            data-testid="fetch-reports-button"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Fetch Latest Reports
                        </button>
                    </div>

                    <ReportSearch />
                    <SectorFilter />
                    <ReportTable />
                    <ReportSummary />
                </div>
            </div>
        </div>
    );
};

export default ReportDashboard;