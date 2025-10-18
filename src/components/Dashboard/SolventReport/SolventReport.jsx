//SolventReport Dashboard
import React, { useEffect, useState } from "react";
import { Download, RefreshCw, Activity } from "lucide-react";
import DateSelector from "./Solvent_DateSelector/DateSelector.jsx";
import {
  fetchSolventDashboard,
  getOperatorSummaryForDate,
} from "../../../api/solvent.js";

const SolventReport = () => {
  const [parameters, setParameters] = useState([
    { name: "Crude Oil Color", value: "0 Ton" },
    { name: "Crude Oil Moisture", value: "0 Ton" },
    { name: "Dorb Oil %", value: "0 Ton" },
    { name: "Steam Consumed", value: "0 Ton" },
    { name: "Electric Consumed", value: "0 units" },
    { name: "Total Production", value: "0 MT" },
  ]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [charts, setCharts] = useState([]);

  // Default table with operators and zero values
  const [detailedReport, setDetailedReport] = useState({
    operators: ["Operator A", "Operator B", "Operator C"],
    rows: {
      CrudeOilColor: [0, 0, 0],
      CrudeOilMoisture: [0, 0, 0],
      DORBOilPercent: [0, 0, 0],
      steamConsumed: [0, 0, 0],
      electricConsumed: [0, 0, 0],
      CrudeOilProduction: [0, 0, 0],
      DORBProduction: [0,0,0],
      totalWorkingHours: [0, 0, 0],
      daysPresent: [0, 0, 0],
    },
  });

  // Helper to format date as YYYY-MM-DD
  const formatDate = (date) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return null;
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Process operator summary data
  const processOperatorData = (operatorSummaries) => {
    if (!operatorSummaries || operatorSummaries.length === 0) {
      return {
        operators: ["No Data"],
        rows: {
          CrudeOilColor: [0],
          CrudeOilMoisture: [0],
          DORBOilPercent: [0],
          steamConsumed: [0],
          electricConsumed: [0],
          CrudeOilProduction: [0],
          DORBProduction:[0],
          totalWorkingHours: [0],
          daysPresent: [1],
        },
      };
    }

    const operators = operatorSummaries.map(
      (op) => op.operatorName || "Unknown"
    );

    const rows = {
      CrudeOilColor: operatorSummaries.map((op) => op.crudeOilColor || 0),
      CrudeOilMoisture: operatorSummaries.map((op) => op.crudeOilMoisture || 0),
      DORBOilPercent: operatorSummaries.map((op) => op.dorbOilMoisture || 0),
      steamConsumed: operatorSummaries.map((op) => op.steamConsumed || 0),
      electricConsumed: operatorSummaries.map((op) => op.electricConsumed || 0),
      CrudeOilProduction: operatorSummaries.map((op) => op.totalCrudeOilProduction || 0),
  DORBProduction : operatorSummaries.map((op) => op.totalDORBProduction || 0),
      totalWorkingHours: operatorSummaries.map((op) => op.totalHours || 0),
      daysPresent: operatorSummaries.map(() => 1), // Single day = 1
    };

    return { operators, rows };
  };


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
            : { dateRange: `${startFormatted} ${endFormatted}` };
      }

      setLoading(true);
      try {
        if (payload.date) {
          // Single date request
          console.log("Fetching data for single date:", payload.date);

          const operatorSummaries = await getOperatorSummaryForDate(
            payload.date
          );
          console.log("Operator summaries received:", operatorSummaries);

          if (operatorSummaries && operatorSummaries.length > 0) {
            const processedData = processOperatorData(operatorSummaries);
            setDetailedReport(processedData);

            const totals = operatorSummaries.reduce(
              (acc, op) => {
                acc.steam += op.steamConsumed || 0;
                acc.electric += op.electricConsumed || 0;
                acc.production +=
                  (op.totalCrudeOilProduction || 0) +
                  (op.totalDORBProduction || 0);
                return acc;
              },
              { steam: 0, electric: 0, production: 0 }
            );

            setParameters([
              { name: "Steam Consumed", value: `${totals.steam} Ton` },
              { name: "Electric Consumed", value: `${totals.electric} units` },
              {
                name: "Total Production",
                value: `${totals.production.toFixed(2)} MT`,
              },
            ]);
          } else {
            // Reset to defaults for no data
            setDetailedReport({
              operators: ["No Data Available"],
              rows: {
                CrudeOilColor: [0],
                CrudeOilMoisture: [0],
                DORBOilPercent: [0],
                steamConsumed: [0],
                electricConsumed: [0],
                CrudeOilProduction: [0],
                DORBProduction: [0],
                totalWorkingHours: [0],
                daysPresent: [0],
              },
            });
            setParameters([
              { name: "Steam Consumed", value: "0 Ton" },
              { name: "Electric Consumed", value: "0 units" },
              { name: "Total Production", value: "0 MT" },
            ]);
          }
        } else {
          // Date range request - FIX: Use the dashboard API properly
          console.log("Fetching data for date range:", payload);

          const response = await fetchSolventDashboard(payload);
          console.log("Dashboard response:", response);

          if (response?.data) {
            // Update parameters with totals
            setParameters([
              {
                name: "Steam Consumed",
                value: `${response.data.steam ?? 0} Ton`,
              },
              {
                name: "Electric Consumed",
                value: `${response.data.electric ?? 0} units`,
              },
              {
                name: "Total Production",
                value: `${response.data.production ?? 0} MT`,
              },
            ]);

            // FIX: Handle detailed report table from date range
            if (response.detailedReportTable) {
              console.log(
                "Setting detailed report table:",
                response.detailedReportTable
              );
              setDetailedReport(response.detailedReportTable);
            } else {
              // Fallback if no detailed report
              setDetailedReport({
                operators: ["No Data Available"],
                rows: {
                  CrudeOilColor: [0],
                  CrudeOilMoisture: [0],
                  DORBOilPercent: [0],
                  steamConsumed: [0],
                  electricConsumed: [0],
                  CrudeOilProduction: [0],
                  DORBProduction:[0],
                  totalWorkingHours: [0],
                  daysPresent: [0],
                },
              });
            }
          } else {
            // No response data
            setParameters([
              { name: "Steam Consumed", value: "0 Ton" },
              { name: "Electric Consumed", value: "0 units" },
              { name: "Total Production", value: "0 MT" },
            ]);

            setDetailedReport({
              operators: ["No Data Available"],
              rows: {
                CrudeOilColor: [0],
                CrudeOilMoisture: [0],
                DORBOilPercent: [0],
                steamConsumed: [0],
                electricConsumed: [0],
                production: [0],
                DORBProduction:[0],
                totalWorkingHours: [0],
                daysPresent: [0],
              },
            });
          }

          // Set charts if available
          if (response?.charts) setCharts(response.charts);
        }
      } catch (error) {
        console.error(" Error fetching dashboard:", error);

        // Reset to error state
        setDetailedReport({
          operators: ["Error Loading Data"],
          rows: {
            CrudeOilColor: [0],
            CrudeOilMoisture: [0],
            DORBOilPercent: [0],
            steamConsumed: [0],
            electricConsumed: [0],
            CrudeOilProduction: [0],
            DORBProduction:[0],
            totalWorkingHours: [0],
            daysPresent: [0],
          },
        });

        setParameters([
          { name: "Steam Consumed", value: "0 Ton" },
          { name: "Electric Consumed", value: "0 units" },
          { name: "Total Production", value: "0 MT" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [selectedDate]);

  // Manual refresh (single date = today)
  const handleRefresh = () => {
    const today = new Date();
    setSelectedDate({ startDate: today, endDate: today });
  };

  //Row labels
  const rowLabels = {
    CrudeOilColor: "Crude Oil Color",
    CrudeOilMoisture: "Crude Oil Moisture (%)",
    DORBOilPercent: "Dorb Oil (%)",
    steamConsumed: "Steam Consumed (Ton)",
    electricConsumed: "Electric Consumed (Unit)",
    CrudeOilProduction: "Crude Oil Production (MT)",
    DORBProduction: "Dorb Production(Bags)",
    totalWorkingHours: "Total Working Hours",
    daysPresent: "No. of Days Present",
  };

  //Ranking Calculations
  const getSteamRanking = () => {
    const { operators, rows } = detailedReport;
    return operators
      .map((op, i) => {
        const steam = rows.steamConsumed[i] ?? 0;
        const prod = rows.CrudeOilProduction[i] ?? 0;
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
        const prod = rows.CrudeOilProduction[i] ?? 0;
        const ratio = prod > 0 ? elec / prod : 0;
        return { operator: op, ratio };
      })
      .sort((a, b) => {
        if (a.ratio === 0 && b.ratio === 0) return 0;
        if (a.ratio === 0) return 1;
        if (b.ratio === 0) return -1;
        return a.ratio - b.ratio;
      });
  };

  const getProductionRanking = () => {
    const { operators, rows } = detailedReport;
    return operators
      .map((op, i) => ({
        operator: op,
        production: rows.CrudeOilProduction[i] ?? 0,
      }))
      .sort((a, b) => b.production - a.production);
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
                <h1 className="text-3xl font-bold text-gray-900">
                  Solvent Report
                </h1>
                {loading && (
                  <p className="text-sm text-gray-500 mt-1">Loading data...</p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
              >
                <RefreshCw
                  className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                />
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
        {/* Date Selector */}
        {/* <DateSelector
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
        /> */}
        <DateSelector
          onChange={(date) => {
            console.log("DateSelector onChange called with:", date);

            try {
              if (!date) {
                console.log("No date provided, setting selectedDate to null");
                setSelectedDate(null);
                return;
              }

              if (date.type === "date" && date.value) {
                // Single date
                console.log("Single date selected:", date.value);
                const singleDate = new Date(date.value);
                setSelectedDate({
                  startDate: singleDate,
                  endDate: singleDate,
                });
              } else if (
                date.type === "range" &&
                date.value &&
                Array.isArray(date.value)
              ) {
                // Date range - DateSelector sends [start, end] array
                const [startDate, endDate] = date.value;
                console.log("Date range selected:", { startDate, endDate });

                setSelectedDate({
                  startDate: new Date(startDate),
                  endDate: new Date(endDate),
                });
              } else {
                console.log("Unknown date format, setting to null");
                setSelectedDate(null);
              }
            } catch (error) {
              console.error("Error processing date:", error);
              setSelectedDate(null);
            }
          }}
        />
        {/* Operator Rankings Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-0 mb-6 my-10">
          <div className="bg-gradient-to-r from-indigo-400 to-purple-400 px-6 py-3 rounded-t-xl">
            <h2 className="text-xl font-semibold text-white">
              Operator Rankings
            </h2>
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
                          {Number(item.ratio).toFixed(2)}
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
                          {Number(item.ratio).toFixed(2)}
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
                          {Number(item.production).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* Detailed Report Section (always visible, default zeros) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-0 mb-6 my-8">
          <div className="bg-gradient-to-r from-pink-400 to-rose-400 px-6 py-3 rounded-t-xl">
            <h2 className="text-xl font-semibold text-white">
              Detailed Report
            </h2>
          </div>

          <div className="p-6 overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-center">
              <thead>
                <tr className="bg-gradient-to-r from-blue-400 to-indigo-400 text-white">
                  <th className="px-4 py-3 font-semibold border border-gray-300">
                    Parameter / Operator
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
                {Object.entries(detailedReport.rows).map(
                  ([key, values], rowIdx) => {
                    const safeValues = detailedReport.operators.map(
                      (_, i) => values[i] ?? 0
                    );
                    const total = safeValues.reduce((sum, val) => sum + val, 0);

                    return (
                      <tr
                        key={rowIdx}
                        className={
                          rowIdx % 2 === 0
                            ? "bg-blue-50 hover:bg-blue-100"
                            : "bg-white"
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
                            {Number(val).toFixed(2)}
                          </td>
                        ))}
                        <td className="px-4 py-2 font-bold text-blue-700 border border-gray-300">
                          {total.toFixed(2)}
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolventReport;
