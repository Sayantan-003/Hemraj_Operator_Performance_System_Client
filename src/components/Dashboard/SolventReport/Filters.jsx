import React from "react";

const Filters = ({ operators, shiftHours, shiftNames, filter, onOperatorChange, onHoursChange, onShiftChange }) => {
  const locked = !!filter.operator;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {/* Operator */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Operator Name</label>
        <select
          value={filter.operator}
          onChange={(e) => onOperatorChange(e.target.value)}
          className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm p-2 text-sm"
        >
          <option value="">Select operator</option>
          {operators.map((op, idx) => (
            <option key={idx} value={op.name}>
              {op.name}
            </option>
          ))}
        </select>
      </div>

      {/* Shift Hours */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Shift Hours</label>
        <select
          value={filter.hours}
          onChange={(e) => onHoursChange(e.target.value)}
          disabled={locked}
          className={`mt-1 block w-full border rounded-md shadow-sm p-2 text-sm ${
            locked ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-white border-gray-300"
          }`}
        >
          <option value="">Select hours</option>
          {shiftHours.map((h, idx) => (
            <option key={idx} value={h}>{h}</option>
          ))}
        </select>
      </div>

      {/* Shift Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Shift Name</label>
        <select
          value={filter.shift}
          onChange={(e) => onShiftChange(e.target.value)}
          disabled={locked}
          className={`mt-1 block w-full border rounded-md shadow-sm p-2 text-sm ${
            locked ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-white border-gray-300"
          }`}
        >
          <option value="">Select shift</option>
          {shiftNames.map((s, idx) => (
            <option key={idx} value={s}>{s}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
