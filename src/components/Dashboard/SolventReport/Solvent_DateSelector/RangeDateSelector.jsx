// import React from 'react';
// import DatePicker from 'react-datepicker';
// import {  CalendarDays, AlertCircle } from 'lucide-react';

// const RangeDateSelector = ({ range, setRange, error, maxDate }) => (
//   <div className="flex-grow">
//     <div className="flex items-center space-x-2 mb-2">
//       <CalendarDays className="h-4 w-4 text-purple-600" />
//       <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
//         Date Range
//       </label>
//     </div>
    
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
//       <div>
//         <input
//           type="date"
//           value={range.start ? range.start.toISOString().split('T')[0] : ''}
//           onChange={(e) => setRange({ ...range, start: e.target.value ? new Date(e.target.value) : null })}
//           max={maxDate}
//           className="w-full bg-gradient-to-r from-gray-50 to-purple-50 border-2 border-gray-200 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-gray-300"
//           placeholder="Start Date"
//           aria-label="Select start date"
//         />
//       </div>
      
//       <div>
//         <input
//           type="date"
//           value={range.end ? range.end.toISOString().split('T')[0] : ''}
//           onChange={(e) => setRange({ ...range, end: e.target.value ? new Date(e.target.value) : null })}
//           min={range.start ? range.start.toISOString().split('T')[0] : ''}
//           className="w-full bg-gradient-to-r from-gray-50 to-purple-50 border-2 border-gray-200 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-gray-300"
//           placeholder="End Date"
//           aria-label="Select end date"
//         />
//       </div>
//     </div>

//     {error && (
//       <div className="flex items-center space-x-2 mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
//         <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
//         <p className="text-xs text-red-800 font-medium">{error}</p>
//       </div>
//     )}
//   </div>
// );

// export default RangeDateSelector;





// Replace your RangeDateSelector component with this fixed version:

import React from 'react';
import { CalendarDays, AlertCircle } from 'lucide-react';

const RangeDateSelector = ({ range, setRange, error, maxDate }) => (
  <div className="flex-grow">
    <div className="flex items-center space-x-2 mb-2">
      <CalendarDays className="h-4 w-4 text-purple-600" />
      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
        Date Range
      </label>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <div>
        <input
          type="date"
          value={range.start || ''}
          onChange={(e) => {
            console.log("Start date changed:", e.target.value);
            setRange({ ...range, start: e.target.value || null });
          }}
          max={maxDate}
          className="w-full bg-gradient-to-r from-gray-50 to-purple-50 border-2 border-gray-200 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-gray-300"
          placeholder="Start Date"
          aria-label="Select start date"
        />
      </div>
      
      <div>
        <input
          type="date"
          value={range.end || ''}
          onChange={(e) => {
            console.log("End date changed:", e.target.value);
            setRange({ ...range, end: e.target.value || null });
          }}
          min={range.start || ''}
          max={maxDate}
          className="w-full bg-gradient-to-r from-gray-50 to-purple-50 border-2 border-gray-200 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-gray-300"
          placeholder="End Date"
          aria-label="Select end date"
        />
      </div>
    </div>

    {error && (
      <div className="flex items-center space-x-2 mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
        <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
        <p className="text-xs text-red-800 font-medium">{error}</p>
      </div>
    )}
  </div>
);

export default RangeDateSelector;