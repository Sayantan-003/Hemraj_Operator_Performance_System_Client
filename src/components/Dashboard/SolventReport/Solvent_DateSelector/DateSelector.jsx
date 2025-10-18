import React, { useState, useEffect, useCallback} from 'react';
import ModeDropdown from './ModeDropdown';
import SingleDateSelector from './SingleDateSelector';
import RangeDateSelector from './RangeDateSelector';
import StatusDisplay from './StatusDisplay';


const DateSelector = ({ onChange }) => {
  const [mode, setMode] = useState('date');
  const [selectedDate, setSelectedDate] = useState(null);
  const [range, setRange] = useState({ start: null, end: null });
  const [error, setError] = useState('');

  const todayISO = new Date().toISOString().split("T")[0];

  // useEffect(() => {
  //   setError('');

  //   if (mode === 'date') {
  //     if (!selectedDate) return; // wait until date is fully picked

  //     if (selectedDate > todayISO) {
  //       setError("Future dates are not allowed.");
  //       return;
  //     }

  //     // Only fire when valid single date is ready
  //     onChange && onChange({ type: 'date', value: selectedDate });

  //   } else if (mode === 'range') {
  //     // Don’t fire until both start & end are present
  //     if (!range.start || !range.end) return;

  //     if (range.start > todayISO || range.end > todayISO) {
  //       setError("Future dates are not allowed in range.");
  //       return;
  //     }
  //     if (range.end < range.start) {
  //       setError('End date cannot be before start date');
  //       return;
  //     }

  //     //Only fire when both valid range dates are ready
  //      onChange && onChange({
  //      type: 'range',
  //      value: [range.start, range.end]  // always an array
  //    });
  //   }
  // }, [mode, selectedDate, range]);


useEffect(() => {
  setError('');

  if (mode === 'date') {
    if (!selectedDate) return; // wait until date is fully picked

    if (selectedDate > todayISO) {
      setError("Future dates are not allowed.");
      return;
    }

    // Only fire when valid single date is ready
    console.log("DateSelector: Firing single date event:", selectedDate);
    onChange && onChange({ type: 'date', value: selectedDate });

  } else if (mode === 'range') {
    // Don't fire until both start & end are present
    if (!range.start || !range.end) return;

    // Now comparing strings with strings
    if (range.start > todayISO || range.end > todayISO) {
      setError("Future dates are not allowed in range.");
      return;
    }
    if (range.end < range.start) {
      setError('End date cannot be before start date');
      return;
    }

    // Only fire when both valid range dates are ready
    console.log("DateSelector: Firing range event:", [range.start, range.end]);
    onChange && onChange({
      type: 'range',
      value: [range.start, range.end]  // array of ISO date strings
    });
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
            <SingleDateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} maxDate={todayISO} />
          ) : (
            <RangeDateSelector range={range} setRange={setRange} error={error}  maxDate={todayISO}/>
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