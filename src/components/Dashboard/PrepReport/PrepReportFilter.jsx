
import React from "react";
import prepOperatorNames from "../../../constants/prepOperatorNames";

const PrepReportFilters = ({ shiftHours, shiftNames, filter, setFilter }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  // Dynamically set the label text based on conditions
  const shiftLabel =
    shiftHours > 8 && !String(shiftNames).includes("+")
      ? "No. of Days Present"
      : "Shift Name";

  return (
    <div className="mt-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Operator Name Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Operator Name</label>
        <select
          name="operator"
          value={filter.operator}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select Operator</option>
          {prepOperatorNames.map((op, idx) => (
            <option key={idx} value={op}>
              {op}
            </option>
          ))}
        </select>
      </div>

      {/* Shift Hours Display (Read-only Text Field) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Shift Hours
        </label>
        <input
          type="text"
          value={shiftHours || "Auto-calculated"}
          readOnly
          className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 shadow-sm focus:outline-none sm:text-sm cursor-default"
        />
      </div>

      {/* Shift Name Display with Conditional Label */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {shiftLabel}
        </label>
        <input
          type="text"
          value={shiftNames || "Absent"}
          readOnly
          className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 shadow-sm focus:outline-none sm:text-sm cursor-default"
        />
      </div>
    </div>
  );
};

export default PrepReportFilters;

