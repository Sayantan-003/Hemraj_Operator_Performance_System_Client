import { Calendar } from 'lucide-react';

import React from 'react';
import DatePicker from 'react-datepicker';
const SingleDateSelector = ({ selectedDate, setSelectedDate }) => (
  <div className="flex-grow">
    <div className="flex items-center space-x-2 mb-2">
      <Calendar className="h-4 w-4 text-blue-600" />
      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
        Choose Date
      </label>
    </div>
    <input
      type="date"
      value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
      onChange={(e) => setSelectedDate(e.target.value ? new Date(e.target.value) : null)}
      className="w-full bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-gray-200 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-300"
      aria-label="Select a date"
    />
  </div>
);


export default SingleDateSelector;
