
import React, { useEffect, useState } from "react";
import { Download, RefreshCw, Activity } from "lucide-react";
import DateSelector from "./Prep_DateSelector/DateSelector";
import { fetchPrepDashboard } from "../../../api/fetchPrepDashboard";

const PrepReport = () => {
  const [parameters, setParameters] = useState([
    { name: "Steam Consumed", value: "0 Ton" },
    { name: "Electric Consumed", value: "0 units" },
    { name: "Total Production", value: "0 MT" },
  ]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [charts, setCharts] = useState([]);

  // ✅ Default table with operators and zero values
  const [detailedReport, setDetailedReport] = useState({
    operators: ["Operator A", "Operator B", "Operator C"],
    rows: {
      steamConsumed: [0, 0, 0],
      electricConsumed: [0, 0, 0],
      production: [0, 0, 0],
      totalWorkingHours: [0, 0, 0],
      daysPresent: [0, 0, 0],
    },
  });

  // ✅ Helper to format date as YYYY-MM-DD
  const formatDate = (date) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return null;
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // ✅ Fetch Dashboard Data
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!selectedDate) return;

      let payload = {};
      if (selectedDate.startDate && selectedDate.endDate) {
        const startFormatted = formatDate(selectedDate.startDate);
        const endFormatted = formatDate(selectedDate.endDate);
        if (!startFormatted || !endFormatted) return;

        payload =
          startFormatted === endFormatted
            ? { date: startFormatted }
            : { date: `${startFormatted} ${endFormatted}` };
      }

      setLoading(true);
      try {
        const response = await fetchPrepDashboard(payload);
        if (response?.data) {
          setParameters([
            { name: "Steam Consumed", value: `${response.data.steam} Ton` },
            { name: "Electric Consumed", value: `${response.data.electric} units` },
            { name: "Total Production", value: `${response.data.production} MT` },
          ]);

          if (response.data.detailedReportTable) {
            setDetailedReport(response.data.detailedReportTable);
          }
        }

        if (response?.charts) setCharts(response.charts);
      } catch (error) {
        console.error("❌ Error fetching dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [selectedDate]);

  // ✅ Manual refresh (single date = today)
  const handleRefresh = () => {
    const today = new Date();
    setSelectedDate({ startDate: today, endDate: today });
  };

  // ✅ Row labels
  const rowLabels = {
    steamConsumed: "Steam Consumed (Ton)",
    electricConsumed: "Electric Consumed (Unit)",
    production: "Production (MT)",
    totalWorkingHours: "Total Working Hours",
    daysPresent: "No. of Days Present",
  };

  // ✅ Ranking Calculations
  const getSteamRanking = () => {
    const { operators, rows } = detailedReport;
    return operators
      .map((op, i) => {
        const steam = rows.steamConsumed[i] ?? 0;
        const prod = rows.production[i] ?? 0;
        const ratio = prod > 0 ? steam / prod : 0;
        return { operator: op, ratio };
      })
      .sort((a, b) => {
        if (a.ratio === 0 && b.ratio === 0) return 0;
        if (a.ratio === 0) return 1; // push zero to last
        if (b.ratio === 0) return -1;
        return a.ratio - b.ratio; // ascending
      });
  };

  const getElectricRanking = () => {
    const { operators, rows } = detailedReport;
    return operators
      .map((op, i) => {
        const elec = rows.electricConsumed[i] ?? 0;
        const prod = rows.production[i] ?? 0;
        const ratio = prod > 0 ? elec / prod : 0;
        return { operator: op, ratio };
      })
      .sort((a, b) => {
        if (a.ratio === 0 && b.ratio === 0) return 0;
        if (a.ratio === 0) return 1; // push zero to last
        if (b.ratio === 0) return -1;
        return a.ratio - b.ratio; // ascending
      });
  };

  const getProductionRanking = () => {
    const { operators, rows } = detailedReport;
    return operators
      .map((op, i) => ({
        operator: op,
        production: rows.production[i] ?? 0,
      }))
      .sort((a, b) => b.production - a.production); // descending
  };

  const steamRanking = getSteamRanking();
  const electricRanking = getElectricRanking();
  const productionRanking = getProductionRanking();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 mt-25">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Prep Report</h1>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <button
                onClick={handleRefresh}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </button>

              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ✅ Date Selector */}
        <DateSelector
          onChange={(date) => {
            if (date && date.value && date.value.start && date.value.end) {
              setSelectedDate({
                startDate: new Date(date.value.start),
                endDate: new Date(date.value.end),
              });
            } else if (date && date.value) {
              const singleDate = new Date(date.value);
              setSelectedDate({ startDate: singleDate, endDate: singleDate });
            } else if (date) {
              const singleDate = new Date(date);
              setSelectedDate({ startDate: singleDate, endDate: singleDate });
            } else {
              setSelectedDate(null);
            }
          }}
        />

        {/* ✅ Operator Rankings Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-0 mb-6 my-10">
          <div className="bg-gradient-to-r from-indigo-400 to-purple-400 px-6 py-3 rounded-t-xl">
            <h2 className="text-xl font-semibold text-white">Operator Rankings</h2>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Steam Wise Ranking */}
              <div className="rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-400 to-indigo-400 px-4 py-3">
                  <h3 className="text-lg font-semibold text-white">
                    Steam wise Ranking
                  </h3>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        Operator's Name
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        Steam per ton
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300">
                    {steamRanking.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-2 text-sm text-gray-900">
                          {item.operator}
                        </td>
                        <td className="px-4 py-2 text-sm text-blue-600 font-bold">
                          {item.ratio.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Electric Unit Wise Ranking */}
              <div className="rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-300 to-rose-300 px-4 py-3">
                  <h3 className="text-lg font-semibold text-white">
                    Electric Unit wise Ranking
                  </h3>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        Operator's Name
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        Electric Unit per ton
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300">
                    {electricRanking.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-2 text-sm text-gray-900">
                          {item.operator}
                        </td>
                        <td className="px-4 py-2 text-sm text-orange-400 font-bold">
                          {item.ratio.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Production Wise Ranking */}
              <div className="rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-400 to-indigo-400 px-4 py-3">
                  <h3 className="text-lg font-semibold text-white">
                    Production wise Ranking
                  </h3>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        Operator's Name
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        Total Production (MT)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300">
                    {productionRanking.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-2 text-sm text-gray-900">
                          {item.operator}
                        </td>
                        <td className="px-4 py-2 text-sm text-purple-600 font-bold">
                          {item.production.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Detailed Report Section (always visible, default zeros) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-0 mb-6 my-8">
          <div className="bg-gradient-to-r from-pink-400 to-rose-400 px-6 py-3 rounded-t-xl">
            <h2 className="text-xl font-semibold text-white">Detailed Report</h2>
          </div>

          <div className="p-6 overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-center">
              <thead>
                <tr className="bg-gradient-to-r from-blue-400 to-indigo-400 text-white">
                  <th className="px-4 py-3 font-semibold border border-gray-300">
                    Operator Name
                  </th>
                  {detailedReport.operators.map((op, idx) => (
                    <th
                      key={idx}
                      className="px-4 py-3 font-semibold border border-gray-300"
                    >
                      {op}
                    </th>
                  ))}
                  <th className="px-4 py-3 font-semibold border border-gray-300">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(detailedReport.rows).map(([key, values], rowIdx) => {
                  const safeValues = detailedReport.operators.map(
                    (_, i) => values[i] ?? 0
                  );
                  const total = safeValues.reduce((sum, val) => sum + val, 0);

                  return (
                    <tr
                      key={rowIdx}
                      className={
                        rowIdx % 2 === 0 ? "bg-blue-50 hover:bg-blue-100" : "bg-white"
                      }
                    >
                      <td className="px-4 py-2 font-semibold text-gray-800 border border-gray-300">
                        {rowLabels[key] || key}
                      </td>
                      {safeValues.map((val, i) => (
                        <td
                          key={i}
                          className="px-4 py-2 font-bold text-gray-700 border border-gray-300"
                        >
                          {val.toFixed(2)}
                        </td>
                      ))}
                      <td className="px-4 py-2 font-bold text-blue-700 border border-gray-300">
                        {total.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrepReport;









