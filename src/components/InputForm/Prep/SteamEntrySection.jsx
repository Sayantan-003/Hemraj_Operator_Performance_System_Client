import React, { forwardRef, useImperativeHandle, useState } from "react";

const SteamEntrySection = forwardRef((_, ref) => {
  const [steamData, setSteamData] = useState({
    'Shift_A': "", 'Shift_B': "", 'Shift_C': ""
  });

  useImperativeHandle(ref, () => ({
    getData: () => steamData
  }));

  const handleChange = (shift, field, value) => {
    setSteamData((prev) => ({
      ...prev,
      [shift]: { ...prev[shift], [field]: value }
    }));
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <h2 className="font-bold text-lg mb-4 bg-[#F0CB8A] p-2 rounded">Total Steam Consumption Entries</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.keys(steamData).map((shift) => (
          <div key={shift}>
            <h3 className="font-medium text-gray-800 mb-2 bg-[#F0CB8A] p-2 rounded mx-auto text-center">{shift}</h3>
            <label className="block font-medium text-gray-700">Steam Consumed</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={steamData[shift]}
              onChange={(e) => setSteamData({ ...steamData, [shift]: e.target.value })}
            />
        </div>
      ))}
    </div>
    </div>
  );
});

export default SteamEntrySection;
