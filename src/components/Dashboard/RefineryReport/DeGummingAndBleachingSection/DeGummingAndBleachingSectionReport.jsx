import React, { useState } from 'react';
import DeGummingAndBleachingSectionFilters from './DeGummingAndBleachingSectionFilters';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, BarChart3 , Download, RefreshCw, Activity } from 'lucide-react';



const DeGummingAndBleachingSectionReport = () => {
  const [filter, setFilter] = useState({ operator: '', hours: '', shift: '' });
  const [operators, setOperators] = useState(['']);
  const [shiftHours, setShiftHours] = useState(['']);
  const [shiftNames, setShiftNames] = useState(['']);
  React.useEffect(() => {
    // Fetch dropdown values
    const fetchDropdowns = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      // Example API calls for refinery dropdowns
      // const [opRes, hrRes, shiftRes] = await Promise.all([
      //   fetch('/api/degumming-bleaching/operators'),
      //   fetch('/api/degumming-bleaching/shifthours'),
      //   fetch('/api/degumming-bleaching/shiftnames')
      // ]);
      // const [ops, hrs, shifts] = await Promise.all([
      //   opRes.json(),
      //   hrRes.json(),
      //   shiftRes.json()
      // ]);
      // setOperators(ops);
      // setShiftHours(hrs);
      // setShiftNames(shifts);
    };
    fetchDropdowns();
  }, []);
  const [parameters, setParameters] = useState([
    { name: 'Total Production', value: '542 mT' },
    { name: 'Steam Consumed', value: '18.42 Ton' },
    { name: 'Unit Consumed', value: '850 unit' },
  ]);
  const [charts, setCharts] = useState([
    [
      { name: '00:00', value: 82 },
      { name: '04:00', value: 85 },
      { name: '08:00', value: 89 },
      { name: '12:00', value: 87 },
      { name: '16:00', value: 91 },
      { name: '20:00', value: 88 }
    ],
    [
      { name: 'Mon', value: 75 },
      { name: 'Tue', value: 79 },
      { name: 'Wed', value: 82 },
      { name: 'Thu', value: 76 },
      { name: 'Fri', value: 85 },
      { name: 'Sat', value: 81 }
    ],
    [
      { name: 'Jan', value: 135 },
      { name: 'Feb', value: 142 },
      { name: 'Mar', value: 128 },
      { name: 'Apr', value: 151 },
      { name: 'May', value: 137 },
      { name: 'Jun', value: 145 }
    ]
  ]);
  const [loading, setLoading] = useState(false);

  const fetchDeGummingAndBleachingData = async ({ type, value }) => {
    if (filter.operator) url += `&operator=${filter.operator}`;
    if (filter.hours) url += `&hours=${filter.hours}`;
    if (filter.shift) url += `&shift=${filter.shift}`;
    setLoading(true);
    try {
      let url = '';

      if (type === 'date' && value) {
        const dateStr = value.toISOString().split('T')[0];
        url = `/api/degumming-bleaching?date=${dateStr}`;
      } else if (type === 'range' && value?.start && value?.end) {
        const startStr = value.start.toISOString().split('T')[0];
        const endStr = value.end.toISOString().split('T')[0];
        url = `/api/degumming-bleaching?start=${startStr}&end=${endStr}`;
      } else {
        setLoading(false);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // const res = await fetch(url);
      // const json = await res.json();
      // setParameters(json.parameters || []);
      // setCharts(json.charts || [[], [], []]);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const chartTitles = ['Total Production', 'Steam Used In Per Ton Production', 'Unit Used in Per Ton Production'];
  const chartColors = ['#3b82f6', '#059669', '#7c3aed'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 mt-25">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">DeGumming and Bleaching Section Report</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DeGummingAndBleachingSectionFilters
          operators={operators}
          shiftHours={shiftHours}
          shiftNames={shiftNames}
          filter={filter}
          setFilter={setFilter}
        />
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading data...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Parameters Table */}
            <div className="xl:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-white" />
                    <h3 className="text-lg font-semibold text-white">Performance Parameters</h3>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {parameters.map((param, idx) => (
                    <div key={idx} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-500">{param.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-blue-600">{param.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="xl:col-span-2 space-y-8">
              {/* Chart 1 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">{chartTitles[0]}</h3>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={charts[0]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={1} />
                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line type="monotone" dataKey="value" stroke={chartColors[0]} strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Chart 2 */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">{chartTitles[1]}</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={charts[1]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={1}  />
                      <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Line type="monotone" dataKey="value" stroke={chartColors[1]} strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Chart 3 */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">{chartTitles[2]}</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={charts[2]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={1}  />
                      <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Line type="monotone" dataKey="value" stroke={chartColors[2]} strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeGummingAndBleachingSectionReport;
