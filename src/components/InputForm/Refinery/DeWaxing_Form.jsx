import React, { useState, useEffect } from 'react';

const DeWaxing_Form = ({ onDataChange = () => {} }) => {
  const [formData, setFormData] = useState({
    date: '',
    numOperators: '1',
    operators: [{ name: '', shiftHours: '', shiftName: '', shifts: [] }]
  });

  const [crystallizer, setCrystallizer] = useState({
    rawWaterStart: '',
    filterStop: '',
  });

  const [dipGap, setDipGap] = useState({
    A: ['', '', '', ''],
    B: ['', '', '', ''],
    C: ['', '', '', ''],
  });

  const [cloudyTanks, setCloudyTanks] = useState({
    A: '',
    B: '',
    C: '',
  });

  const shiftNameOptions = {
    '8': ['Shift A', 'Shift B', 'Shift C'],
    '12': [
      'Shift A + Shift B(1/2)',
      'Shift B + Shift C(1/2)',
      'Shift C + Shift A(1/2)',
      'Shift A(1/2) + Shift B',
      'Shift B(1/2) + Shift C',
      'Shift C(1/2) + Shift A',
    ],
    '16': ['Shift A + Shift B', 'Shift B + Shift C', 'Shift C + Shift A'],
    '24': ['Shift A + Shift B + Shift C'],
  };

  const getShiftSubparts = (shiftName) => {
    if (shiftName === 'Shift A + Shift B(1/2)' || shiftName === 'Shift A(1/2) + Shift B' || shiftName === 'Shift A + Shift B') return ['Shift A', 'Shift B'];
    if (shiftName === 'Shift B + Shift C(1/2)' || shiftName === 'Shift B(1/2) + Shift C' || shiftName === 'Shift B + Shift C') return ['Shift B', 'Shift C'];
    if (shiftName === 'Shift C + Shift A(1/2)' || shiftName === 'Shift C(1/2) + Shift A' || shiftName === 'Shift C + Shift A') return ['Shift C', 'Shift A'];
    if (shiftName === 'Shift A + Shift B + Shift C') return ['Shift A', 'Shift B', 'Shift C'];
    if (['Shift A', 'Shift B', 'Shift C'].includes(shiftName)) return [shiftName];
    return [];
  };

  const handleOperatorChange = (index, field, value) => {
    setFormData(prev => {
      const newOperators = [...prev.operators];
      newOperators[index] = { ...newOperators[index], [field]: value };
      
      // Reset shift name when shift hours change
      if (field === 'shiftHours') {
        newOperators[index].shiftName = '';
        newOperators[index].shifts = [];
      }
      
      // Update shifts when shift name changes
      if (field === 'shiftName' && value) {
        const shiftSubparts = getShiftSubparts(value);
        newOperators[index].shifts = shiftSubparts.map(shiftName => ({
          shiftName,
          dewaxTanks: {
            tank1: dipGap[shiftName.split(' ')[1]] ? parseFloat(dipGap[shiftName.split(' ')[1]][0]) || 0 : 0,
            tank2: dipGap[shiftName.split(' ')[1]] ? parseFloat(dipGap[shiftName.split(' ')[1]][1]) || 0 : 0,
            tank3: dipGap[shiftName.split(' ')[1]] ? parseFloat(dipGap[shiftName.split(' ')[1]][2]) || 0 : 0,
            tank4: dipGap[shiftName.split(' ')[1]] ? parseFloat(dipGap[shiftName.split(' ')[1]][3]) || 0 : 0
          },
          cloudyTank: parseFloat(cloudyTanks[shiftName.split(' ')[1]]) || 0
        }));
      }
      
      return { ...prev, operators: newOperators };
    });
  };

  const handleNumOperatorChange = (value) => {
    const num = parseInt(value);
    const newOperators = Array(num).fill(null).map((_, idx) => 
      formData.operators[idx] || { name: '', shiftHours: '', shiftName: '', shifts: [] }
    );
    
    setFormData(prev => ({
      ...prev,
      numOperators: value,
      operators: newOperators
    }));
  };

  const handleDipGapChange = (shift, index, value) => {
    const updated = { ...dipGap };
    updated[shift][index] = value;
    setDipGap(updated);
  };

  const handleCloudyChange = (shift, value) => {
    setCloudyTanks(prev => ({ ...prev, [shift]: value }));
  };

  const handleDateChange = (value) => {
    setFormData(prev => ({ ...prev, date: value }));
  };

  // Update parent whenever formData or shift data changes
  useEffect(() => {
    // Update operators with latest shift data
    const updatedOperators = formData.operators.map(operator => {
      if (operator.shiftName) {
        const shiftSubparts = getShiftSubparts(operator.shiftName);
        const shifts = shiftSubparts.map(shiftName => {
          const shiftLetter = shiftName.split(' ')[1]; // Extract A, B, or C
          return {
            shiftName,
            crystallizer: {
              rawWaterStart: crystallizer.rawWaterStart,
              filterStop: crystallizer.filterStop
            },
            dewaxTanks: {
              tank1: parseFloat(dipGap[shiftLetter][0]) || 0,
              tank2: parseFloat(dipGap[shiftLetter][1]) || 0,
              tank3: parseFloat(dipGap[shiftLetter][2]) || 0,
              tank4: parseFloat(dipGap[shiftLetter][3]) || 0
            },
            cloudyTank: parseFloat(cloudyTanks[shiftLetter]) || 0
          };
        });
        return { ...operator, shifts };
      }
      return operator;
    });

    const outputData = {
      date: formData.date,
      crystallizer,
      operators: updatedOperators.map(op => ({
        name: op.name,
        shiftHours: parseInt(op.shiftHours) || 0,
        shifts: op.shifts || []
      }))
    };

    onDataChange(outputData);
  }, [formData, crystallizer, dipGap, cloudyTanks, onDataChange]);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-10 mt-10">
      <h2 className="text-xl font-bold text-gray-800 mb-4 px-4 py-2 rounded-md" style={{ backgroundColor: "#FFE95B" }}>
        De-Waxing Section
      </h2>

      {/* Section 1: Date & Operator Present */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={formData.date}
            onChange={(e) => handleDateChange(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Number of Operator Present</label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={formData.numOperators}
            onChange={(e) => handleNumOperatorChange(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
      </div>

      {/* Section 2: Operator Details */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-4 px-3 py-2 rounded-md" style={{ backgroundColor: "#FFE95B" }}>Operator Details</h3>
        {formData.operators.map((op, idx) => (
          <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Operator Name</label>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={op.name}
                onChange={(e) => handleOperatorChange(idx, "name", e.target.value)}
              >
                <option value="">Select</option>
                <option value="Arup Dalui">Arup Dalui</option>
                <option value="Abhijit Dutta">Abhijit Dutta</option>
                <option value="Raju Mukhia">Raju Mukhia</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Shift Hours</label>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={op.shiftHours}
                onChange={(e) => handleOperatorChange(idx, "shiftHours", e.target.value)}
              >
                <option value="">Select</option>
                <option value="8">8 Hours</option>
                <option value="12">12 Hours</option>
                <option value="16">16 Hours</option>
                <option value="24">24 Hours</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Shift Name</label>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={op.shiftName}
                onChange={(e) => handleOperatorChange(idx, "shiftName", e.target.value)}
                disabled={!op.shiftHours}
              >
                <option value="">Select</option>
                {shiftNameOptions[op.shiftHours]?.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Section 3: Crystallizer */}
      <div className="bg-gray-50 rounded-lg p-4 shadow mb-6">
        <h3 className="font-semibold text-gray-800 mb-4 px-3 py-2 rounded-md" style={{ backgroundColor: "#FFE95B" }}>Data Entry for Crystallizer</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Raw Water Start Time</label>
            <input
              type="time"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={crystallizer.rawWaterStart}
              onChange={(e) =>
                setCrystallizer({ ...crystallizer, rawWaterStart: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Filter Stop Time</label>
            <input
              type="time"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={crystallizer.filterStop}
              onChange={(e) =>
                setCrystallizer({ ...crystallizer, filterStop: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      {/* Section 4: Dip/Gap of De-Wax Tanks */}
      <div className="bg-gray-50 rounded-lg p-4 shadow mb-6">
        <h3 className="font-semibold text-gray-800 mb-4 px-3 py-2 rounded-md" style={{ backgroundColor: "#FFE95B" }}>Dip/Gap Of De-Wax Tanks</h3>
        {["A", "B", "C"].map((shift) => (
          <div key={shift} className="mb-6">
            <h4 className="font-semibold text-gray-700 mt-7 mb-5 px-2 py-1 rounded-md w-1/4 mx-auto" style={{ backgroundColor: "#FFE95B" }}>
              Shift {shift}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {dipGap[shift].map((value, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700">
                    Dip/Gap of De-Wax Tank {index + 1}
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={value}
                    onChange={(e) =>
                      handleDipGapChange(shift, index, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Section 5: Dip/Gap of Cloudy Tanks */}
      <div className="bg-gray-50 rounded-lg p-4 shadow mb-6">
        <h3 className="font-semibold text-gray-800 mb-4 px-3 py-2 rounded-md" style={{ backgroundColor: "#FFE95B" }}>
          Dip/Gap Of Cloudy Tanks
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {["A", "B", "C"].map((shift) => (
            <div key={shift}>
              <h4 className="text-center font-semibold text-gray-700 px-2 py-1 rounded-md mb-3" style={{ backgroundColor: "#FFE95B" }}>
                Shift {shift}
              </h4>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dip/Gap of Cloudy Tank</label>
              <input
                type="text"
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={cloudyTanks[shift]}
                onChange={(e) => handleCloudyChange(shift, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeWaxing_Form;