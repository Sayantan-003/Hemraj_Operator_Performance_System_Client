import React, { useState, useEffect } from 'react';

const DEO_Form = ({ onDataChange = () => {} }) => {
  const [formData, setFormData] = useState({
    date: '',
    numOperators: '',
    operators: []
  });

  const [tankType, setTankType] = useState('');
  const [shiftHours, setShiftHours] = useState([]);

  // Tank data state - organized by shift and tank type
  const [tankData, setTankData] = useState({
    ST: {
      A: { st1: '', st2: '', st3: '', st4: '', st5: '', st6: '' },
      B: { st1: '', st2: '', st3: '', st4: '', st5: '', st6: '' },
      C: { st1: '', st2: '', st3: '', st4: '', st5: '', st6: '' }
    },
    FOT: {
      A: { fotA: '', fotB: '' },
      B: { fotA: '', fotB: '' },
      C: { fotA: '', fotB: '' }
    },
    OUT: {
      A: { outTank: '' },
      B: { outTank: '' },
      C: { outTank: '' }
    }
  });

  const [fattyTankData, setFattyTankData] = useState({
    A: '',
    B: '',
    C: ''
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

  const handleShiftHourChange = (index, value) => {
    const updated = [...shiftHours];
    updated[index] = value;
    setShiftHours(updated);

    // Reset shift name when shift hours change
    setFormData(prev => {
      const newOperators = [...prev.operators];
      if (newOperators[index]) {
        newOperators[index] = { ...newOperators[index], shiftHours: value, shiftName: '', shifts: [] };
      }
      return { ...prev, operators: newOperators };
    });
  };

  const handleOperatorChange = (index, field, value) => {
    setFormData(prev => {
      const newOperators = [...prev.operators];
      newOperators[index] = { ...newOperators[index], [field]: value };
      
      // Update shifts when shift name changes
      if (field === 'shiftName' && value) {
        const shiftSubparts = getShiftSubparts(value);
        newOperators[index].shifts = shiftSubparts.map(shiftName => {
          const shiftLetter = shiftName.split(' ')[1]; // Extract A, B, or C
          return {
            shiftName,
            tanks: {
              ST: {
                st1: parseFloat(tankData.ST[shiftLetter].st1) || 0,
                st2: parseFloat(tankData.ST[shiftLetter].st2) || 0,
                st3: parseFloat(tankData.ST[shiftLetter].st3) || 0,
                st4: parseFloat(tankData.ST[shiftLetter].st4) || 0,
                st5: parseFloat(tankData.ST[shiftLetter].st5) || 0,
                st6: parseFloat(tankData.ST[shiftLetter].st6) || 0
              },
              FOT: {
                fotA: parseFloat(tankData.FOT[shiftLetter].fotA) || 0,
                fotB: parseFloat(tankData.FOT[shiftLetter].fotB) || 0
              },
              OUT: {
                outTank: parseFloat(tankData.OUT[shiftLetter].outTank) || 0
              }
            },
            fattyTank: parseFloat(fattyTankData[shiftLetter]) || 0
          };
        });
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

    setShiftHours(Array(num).fill(''));
  };

  const handleTankDataChange = (tankTypeKey, shift, tankKey, value) => {
    setTankData(prev => ({
      ...prev,
      [tankTypeKey]: {
        ...prev[tankTypeKey],
        [shift]: {
          ...prev[tankTypeKey][shift],
          [tankKey]: value
        }
      }
    }));
  };

  const handleFattyTankChange = (shift, value) => {
    setFattyTankData(prev => ({ ...prev, [shift]: value }));
  };

  const handleDateChange = (value) => {
    setFormData(prev => ({ ...prev, date: value }));
  };

  // Update parent whenever formData or tank data changes
  useEffect(() => {
    // Update operators with latest tank data
    const updatedOperators = formData.operators.map(operator => {
      if (operator.shiftName) {
        const shiftSubparts = getShiftSubparts(operator.shiftName);
        const shifts = shiftSubparts.map(shiftName => {
          const shiftLetter = shiftName.split(' ')[1]; // Extract A, B, or C
          return {
            shiftName,
            tanks: {
              ST: {
                st1: parseFloat(tankData.ST[shiftLetter].st1) || 0,
                st2: parseFloat(tankData.ST[shiftLetter].st2) || 0,
                st3: parseFloat(tankData.ST[shiftLetter].st3) || 0,
                st4: parseFloat(tankData.ST[shiftLetter].st4) || 0,
                st5: parseFloat(tankData.ST[shiftLetter].st5) || 0,
                st6: parseFloat(tankData.ST[shiftLetter].st6) || 0
              },
              FOT: {
                fotA: parseFloat(tankData.FOT[shiftLetter].fotA) || 0,
                fotB: parseFloat(tankData.FOT[shiftLetter].fotB) || 0
              },
              OUT: {
                outTank: parseFloat(tankData.OUT[shiftLetter].outTank) || 0
              }
            },
            fattyTank: parseFloat(fattyTankData[shiftLetter]) || 0
          };
        });
        return { ...operator, shifts };
      }
      return operator;
    });

    const outputData = {
      date: formData.date,
      tankType,
      operators: updatedOperators.map(op => ({
        name: op.name,
        shiftHours: parseInt(op.shiftHours) || 0,
        shifts: op.shifts || []
      }))
    };

    onDataChange(outputData);
  }, [formData, tankData, fattyTankData, tankType, onDataChange]);

  const renderOperatorFields = () => {
    const operatorFields = [];
    for (let i = 0; i < Number(formData.numOperators); i++) {
      const currentShiftHour = shiftHours[i] || '';
      const shiftNameOptions = getShiftNameOptions(currentShiftHour);

      operatorFields.push(
        <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Operator Name</label>
            <select 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={formData.operators[i]?.name || ''}
              onChange={(e) => handleOperatorChange(i, 'name', e.target.value)}
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
              value={currentShiftHour}
              onChange={(e) => handleShiftHourChange(i, e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
              value={formData.operators[i]?.shiftName || ''}
              onChange={(e) => handleOperatorChange(i, 'shiftName', e.target.value)}
              disabled={!currentShiftHour}
            >
              <option value="">Select</option>
              {shiftNameOptions.map((option, idx) => (
                <option key={idx} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      );
    }
    return operatorFields;
  };

  const getShiftNameOptions = (hour) => {
    return shiftNameOptions[hour] || [];
  };

  const renderTankTypeSection = () => {
    switch (tankType) {
      case 'ST':
        return (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 px-4 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Dip/Gap Entries of Storage Tanks (ST)</h3>
            {['A', 'B', 'C'].map((shift) => (
              <div key={shift} className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2 px-4 py-1 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Shift {shift}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                  {[1, 2, 3].map((num) => (
                    <div key={num}>
                      <label className="block text-sm font-medium text-gray-700">Dip/Gap of ST {num}</label>
                      <input 
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
                        type="text"
                        value={tankData.ST[shift][`st${num}`]}
                        onChange={(e) => handleTankDataChange('ST', shift, `st${num}`, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[4, 5, 6].map((num) => (
                    <div key={num}>
                      <label className="block text-sm font-medium text-gray-700">Dip/Gap of ST {num}</label>
                      <input 
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
                        type="text"
                        value={tankData.ST[shift][`st${num}`]}
                        onChange={(e) => handleTankDataChange('ST', shift, `st${num}`, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      case 'FOT':
        return (
          <div className="bg-white rounded-xl shadow-md p-6 mb-10 mt-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 px-4 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Dip/Gap Entries of Final Oil Tanks (FOT)</h3>
            {['A', 'B', 'C'].map((shift) => (
              <div key={shift} className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2 px-4 py-1 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Shift {shift}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['FOT-A', 'FOT-B'].map((name, idx) => (
                    <div key={name}>
                      <label className="block text-sm font-medium text-gray-700">Dip/Gap of {name}</label>
                      <input 
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
                        type="text"
                        value={tankData.FOT[shift][idx === 0 ? 'fotA' : 'fotB']}
                        onChange={(e) => handleTankDataChange('FOT', shift, idx === 0 ? 'fotA' : 'fotB', e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      case 'OUT':
        return (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 px-4 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Dip/Gap Entries for OUT Tanks</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['A', 'B', 'C'].map((shift) => (
                <div key={shift}>
                  <h4 className="font-semibold text-gray-800 mb-2 px-4 py-1 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Shift {shift}</h4>
                  <label className="block text-sm font-medium text-gray-700">Dip/Gap of OUT Tanks</label>
                  <input 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
                    type="text"
                    value={tankData.OUT[shift].outTank}
                    onChange={(e) => handleTankDataChange('OUT', shift, 'outTank', e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-10 mt-10">
      <h2 className="text-xl font-bold text-gray-900 mb-6 px-4 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>DEO Section</h2>

      {/* Date and Operator Count */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
            value={formData.numOperators}
            onChange={(e) => handleNumOperatorChange(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
      </div>

      {/* Operator Details */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 px-4 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Operator Details</h3>
        {renderOperatorFields()}
      </div>

      {/* Tank Type Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 px-4 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Tank Type Entries</h3>
        <select 
          value={tankType} 
          onChange={(e) => setTankType(e.target.value)} 
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 mb-4"
        >
          <option value="">Select</option>
          <option value="ST">ST (Storage Tanks)</option>
          <option value="FOT">FOT (Final Oil Tanks)</option>
          <option value="OUT">OUT Tanks</option>
        </select>
        {renderTankTypeSection()}
      </div>

      {/* Dip/Gap Entries for Fatty Tank */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 px-4 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Dip/Gap Entries for Fatty Tank</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['A', 'B', 'C'].map((shift) => (
            <div key={shift}>
              <h4 className="font-semibold text-gray-800 mb-2 px-4 py-1 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Shift {shift}</h4>
              <label className="block text-sm font-medium text-gray-700">Dip/Gap of Fatty Tank</label>
              <input 
                type="text" 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={fattyTankData[shift]}
                onChange={(e) => handleFattyTankChange(shift, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DEO_Form;