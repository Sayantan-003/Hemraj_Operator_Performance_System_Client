import React from "react";
import ShiftSelector from "../../../utils/ShiftSelector";

const OperatorDetails = ({ index, value, onChange, operatorNames }) => {
  const handleShiftChange = (updatedValue) => {
    onChange(index, updatedValue);
  };

  return (
    <ShiftSelector
      value={value}
      onChange={handleShiftChange}
      operatorNames={operatorNames}
    />
  );
};

export default OperatorDetails;
