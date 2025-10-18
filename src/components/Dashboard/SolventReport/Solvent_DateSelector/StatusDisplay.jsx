
import React from 'react';
import { Check, X, Calendar, CalendarDays } from 'lucide-react';

const StatusDisplay = ({ mode, selectedDate, range, error, onClear }) => {
  // Helper function to format date strings to readable format
  const formatDateString = (dateString, format = 'short') => {
    if (!dateString) return '';
    try {
      // Parse the ISO string (YYYY-MM-DD) to Date object for formatting only
      const date = new Date(dateString + 'T00:00:00'); // Add time to avoid timezone issues
      
      if (format === 'numeric') {
        // Format as MM/DD/YYYY
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit', 
          day: '2-digit'
        });
      } else {
        // Default format as "Sep 1, 2025"
        return date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        });
      }
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString; // Return original string if formatting fails
    }
  };

  // Helper to produce YYYY-MM-DD for display without mutating input type.
  // Accepts Date, timestamp, or string and returns a display string in ISO date (YYYY-MM-DD).
  const formatAsISODate = (input) => {
    if (!input && input !== 0) return '';

    // If it's already a string in YYYY-MM-DD, return as-is (preserve type semantics for display)
    if (typeof input === 'string') {
      const isoMatch = /^\d{4}-\d{2}-\d{2}$/.test(input);
      if (isoMatch) return input;

      // Try to parse other string formats to a Date and convert to ISO date for display
      const parsed = new Date(input);
      if (!isNaN(parsed)) return parsed.toISOString().slice(0, 10);

      // Fallback: return original string
      return input;
    }

    // If it's a Date instance
    if (input instanceof Date) {
      if (isNaN(input)) return '';
      return input.toISOString().slice(0, 10);
    }

    // If it's a number (timestamp)
    if (typeof input === 'number') {
      const d = new Date(input);
      if (!isNaN(d)) return d.toISOString().slice(0, 10);
      return '';
    }

    // Fallback to string coercion
    try {
      return String(input);
    } catch (e) {
      return '';
    }
  };

  const hasValidSelection = () => {
    if (mode === 'date') return selectedDate && !error;
    if (mode === 'range') return range.start && range.end && !error;
    return false;
  };

  const getStatusIcon = () => {
    if (error) return <X className="h-4 w-4 text-red-600" />;
    if (hasValidSelection()) return <Check className="h-4 w-4 text-green-600" />;
    return mode === 'date' 
      ? <Calendar className="h-4 w-4 text-gray-400" />
      : <CalendarDays className="h-4 w-4 text-gray-400" />;
  };

  const getStatusText = () => {
    if (error) return error;
    
    if (mode === 'date') {
      return selectedDate
        ? formatAsISODate(selectedDate) // display single date as YYYY-MM-DD
        : 'No date selected';
    }
    
    if (mode === 'range') {
      if (range.start && range.end) {
        // Calculate days between start and end dates
        const startDate = new Date(range.start + 'T00:00:00');
        const endDate = new Date(range.end + 'T00:00:00');
        const timeDiff = endDate.getTime() - startDate.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // +1 to include both start and end dates
        
        return `${daysDiff} days selected`;
      } else if (range.start) {
        return `Start: ${formatDateString(range.start)} (select end date)`;
      } else {
        return 'No range selected';
      }
    }
    
    return '';
  };

  const getStatusColor = () => {
    if (error) return 'text-red-800 bg-red-50 border-red-200';
    if (hasValidSelection()) return 'text-green-800 bg-green-50 border-green-200';
    return 'text-gray-600 bg-gray-50 border-gray-200';
  };

  return (
    <div className="flex-shrink-0 min-w-0 lg:min-w-[200px]">
      <div className="flex items-center space-x-2 mb-2">
        {getStatusIcon()}
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Status
        </label>
      </div>
      
      <div className={`p-3 rounded-lg border transition-all duration-200 ${getStatusColor()}`}>
        <p className="text-sm font-medium break-words">
          {getStatusText()}
        </p>
        
        {hasValidSelection() && (
          <button
            onClick={onClear}
            className="mt-2 text-xs text-gray-500 hover:text-gray-700 font-medium transition-colors duration-200"
          >
            Clear selection
          </button>
        )}
      </div>
    </div>
  );
};

export default StatusDisplay;