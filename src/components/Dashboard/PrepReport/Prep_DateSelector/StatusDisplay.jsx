import { X } from 'lucide-react';

const StatusDisplay = ({ mode, selectedDate, range, error, onClear }) => {
  const hasSelection = mode === 'date' ? selectedDate : (range.start && range.end && !error);
  
  if (!hasSelection) return null;

  return (
    <div className="flex-shrink-0 min-w-[200px]">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Selection
        </label>
        <button
          onClick={onClear}
          className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors duration-200"
          aria-label="Clear selection"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
        {mode === 'date' ? (
          <div>
            <p className="text-sm font-medium text-green-800">
              {selectedDate?.toLocaleDateString('en-GB')}
            </p>
            <p className="text-xs text-green-600 mt-1">Single Date</p>
          </div>
        ) : (
          <div>
            <p className="text-sm font-medium text-green-800">
              {range.start?.toLocaleDateString('en-GB')} - {range.end?.toLocaleDateString('en-GB')}
            </p>
            <p className="text-xs text-green-600 mt-1">
              {Math.ceil((range.end - range.start) / (1000 * 60 * 60 * 24)) + 1} days
            </p>
          </div>
        )}
      </div>
    </div>
  );
};


export default StatusDisplay;