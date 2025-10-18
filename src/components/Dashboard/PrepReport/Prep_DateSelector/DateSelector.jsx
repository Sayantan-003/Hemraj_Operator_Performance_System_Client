import React, { useState, useEffect } from 'react';
import ModeDropdown from './ModeDropdown';
import SingleDateSelector from './SingleDateSelector';
import RangeDateSelector from './RangeDateSelector';
import StatusDisplay from './StatusDisplay';



const DateSelector = ({ onChange }) => {
  const [mode, setMode] = useState('date');
  const [selectedDate, setSelectedDate] = useState(null);
  const [range, setRange] = useState({ start: null, end: null });
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    if (mode === 'date') {
      onChange && onChange({ type: 'date', value: selectedDate });
    } else if (range.start && range.end) {
      if (range.end < range.start) {
        setError('End date cannot be before start date');
      } else {
        onChange && onChange({ type: 'range', value: range });
      }
    }
  }, [mode, selectedDate, range]);

  const reset = () => {
    setSelectedDate(null);
    setRange({ start: null, end: null });
    setError('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Compact Header */}
      <div className="flex items-center justify-between mb-4">
        {/* <div>
          <h1 className="text-xl font-bold text-gray-800">Date Selector</h1>
          <p className="text-sm text-gray-600">Choose your date selection</p>
        </div> */}
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
          mode === 'date' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-purple-100 text-purple-800'
        }`}>
          {mode === 'date' ? 'Single Date' : 'Date Range'}
        </div>
      </div>

      {/* Main Content - Responsive Layout */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        {/* Desktop: Horizontal Layout */}
        <div className="hidden lg:flex items-start space-x-6">
          <ModeDropdown mode={mode} setMode={setMode} reset={reset} />
          
          {mode === 'date' ? (
            <SingleDateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          ) : (
            <RangeDateSelector range={range} setRange={setRange} error={error} />
          )}
          
          <StatusDisplay 
            mode={mode} 
            selectedDate={selectedDate} 
            range={range} 
            error={error}
            onClear={reset}
          />
        </div>

        {/* Mobile: Vertical Layout */}
        <div className="lg:hidden space-y-4">
          <ModeDropdown mode={mode} setMode={setMode} reset={reset} />
          
          {mode === 'date' ? (
            <SingleDateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          ) : (
            <RangeDateSelector range={range} setRange={setRange} error={error} />
          )}
          
          <StatusDisplay 
            mode={mode} 
            selectedDate={selectedDate} 
            range={range} 
            error={error}
            onClear={reset}
          />
        </div>
      </div>
    </div>
  );
};

export default DateSelector;