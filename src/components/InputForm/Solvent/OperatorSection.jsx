import ShiftSelector from "../../../utils/ShiftSelector";
import FormHeader from "./FormHeader";

const OperatorSection = ({ operatorData, numOperators, onChange, onCountChange, operatorNames }) => (
  <div className="bg-white rounded-lg shadow p-4 mb-6">
    <FormHeader title="Operator Details" />
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Number of Operators</label>
      <select value={numOperators} onChange={onCountChange} className="w-full border rounded px-3 py-2">
        {[1, 2, 3].map(n => <option key={n} value={n}>{n}</option>)}
      </select>
    </div>
    {Array.from({ length: numOperators }).map((_, i) => (
      <ShiftSelector
        key={i}
        value={operatorData[i] || { name: '', shiftHour: '', shiftName: '' }}
        onChange={(val) => onChange(i, val)}
        operatorNames={operatorNames}
      />
    ))}
  </div>
);

export default OperatorSection;