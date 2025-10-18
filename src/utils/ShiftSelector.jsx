import React from "react";

const defaultShiftOptions = {
  "8": ["Shift A", "Shift B", "Shift C"],
  "12": [
    "Shift A + Shift B(1/2)",
    "Shift B + Shift C(1/2)",
    "Shift C + Shift A(1/2)",
    "Shift A(1/2) + Shift B",
    "Shift B(1/2) + Shift C",
    "Shift C(1/2) + Shift A",
  ],
  "16": ["Shift A + Shift B", "Shift B + Shift C", "Shift C + Shift A"],
  "24": ["Shift A + Shift B + Shift C"],
};

const ShiftSelector = ({
  shiftOptions = defaultShiftOptions,
  value = { name: "", shiftHour: "", shiftName: "" },
  onChange = () => {},
  operatorNames = [],
}) => {
  const handleChange = (field, val) => {
    const updated = { ...value, [field]: val };

    // Reset shiftName when shiftHour changes
    if (field === "shiftHour") {
      updated.shiftName = "";
    }

    onChange(updated);
  };

  const shiftHourOptions = Object.keys(shiftOptions);
  const shiftNameOptions = value.shiftHour ? shiftOptions[value.shiftHour] : [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {/* Operator Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Operator Name
        </label>
        <select
          className="w-full border border-gray-300 rounded px-2 py-1"
          value={value.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
        >
          <option value="">Select Operator</option>
          {operatorNames.map((name, idx) => (
            <option key={idx} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Shift Hours */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Shift Hours
        </label>
        <select
          className="w-full border border-gray-300 rounded px-2 py-1"
          value={value.shiftHour || ""}
          onChange={(e) => handleChange("shiftHour", e.target.value)}
        >
          <option value="">Select Hours</option>
          {shiftHourOptions.map((hr, idx) => (
            <option key={idx} value={hr}>
              {hr}
            </option>
          ))}
        </select>
      </div>

      {/* Shift Name (depends on Shift Hours) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Shift Name
        </label>
        <select
          className="w-full border border-gray-300 rounded px-2 py-1"
          value={value.shiftName || ""}
          onChange={(e) => handleChange("shiftName", e.target.value)}
          disabled={!value.shiftHour}
        >
          <option value="">
            {value.shiftHour ? "Select Shift" : "Select Shift Hours First"}
          </option>
          {shiftNameOptions.map((timing, idx) => (
            <option key={idx} value={timing}>
              {timing}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ShiftSelector;
