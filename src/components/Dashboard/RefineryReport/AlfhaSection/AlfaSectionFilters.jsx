import React from 'react';

const AlphaSectionFilters = ({ operators, shiftHours, shiftNames, filter, setFilter }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
    {/* Operator Dropdown */}
    <div>
      <label className="block text-sm font-medium text-gray-700">Operator Name</label>
      <select
        value={filter.operator}
        onChange={(e) => setFilter({ ...filter, operator: e.target.value })}
        className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm p-2 text-sm"
      >
        <option value="">All</option>
        {operators.map((op, i) => (
          <option key={i} value={op}>{op}</option>
        ))}
      </select>
    </div>

    {/* Shift Hours Dropdown */}
    <div>
      <label className="block text-sm font-medium text-gray-700">Shift Hours</label>
      <select
        value={filter.hours}
        onChange={(e) => setFilter({ ...filter, hours: e.target.value })}
        className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm p-2 text-sm"
      >
        <option value="">All</option>
        {shiftHours.map((hour, i) => (
          <option key={i} value={hour}>{hour}</option>
        ))}
      </select>
    </div>

    {/* Shift Name Dropdown */}
    <div>
      <label className="block text-sm font-medium text-gray-700">Shift Name</label>
      <select
        value={filter.shift}
        onChange={(e) => setFilter({ ...filter, shift: e.target.value })}
        className="mt-1 block w-full border border-gray-300 bg-white  rounded-md shadow-sm p-2 text-sm"
      >
        <option value="">All</option>
        {shiftNames.map((name, i) => (
          <option key={i} value={name}>{name}</option>
        ))}
      </select>
    </div>
  </div>
);

export default AlphaSectionFilters;
