import React from 'react';
import { ChevronDown } from 'lucide-react';

const ModeDropdown = ({ mode, setMode, reset }) => (
  <div className="flex-shrink-0">
    <label className="block mb-2 text-xs font-semibold text-gray-600 uppercase tracking-wide">
      Mode
    </label>
    <div className="relative">
      <select
        value={mode}
        onChange={(e) => {
          setMode(e.target.value);
          reset();
        }}
        className="appearance-none bg-white border-2 border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 cursor-pointer hover:border-gray-300 min-w-[120px]"
        aria-label="Date selection mode"
      >
        <option value="date">Single Date</option>
        <option value="range">Date Range</option>
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
    </div>
  </div>
);
export default ModeDropdown;