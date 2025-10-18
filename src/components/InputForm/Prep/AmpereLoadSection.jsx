import React, { forwardRef, useImperativeHandle, useState } from "react";

const AmpereLoadSection = forwardRef((_, ref) => {
  const [ampereData, setAmpereData] = useState({
    'Shift_A': "", 'Shift_B': "", 'Shift_C': ""
  });

  useImperativeHandle(ref, () => ({
    getData: () => ampereData
  }));

  return (
    <div className="bg-gray-100 p-4 rounded-xl shadow mb-6">
      <h2 className="font-bold text-lg mb-4 bg-[#F0CB8A] p-2 rounded">Total Ampere Load Entries</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.keys(ampereData).map((shift) => (
          <div key={shift}>
            <h3 className="font-medium text-gray-800 mb-2 bg-[#F0CB8A] p-2 rounded mx-auto text-center">{shift}</h3>
            <label className="block font-medium text-gray-700">Ampere Load</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={ampereData[shift]}
              onChange={(e) => setAmpereData({ ...ampereData, [shift]: e.target.value })}
            />
          </div>
        ))}
      </div>
    </div>
  );
});

export default AmpereLoadSection;
