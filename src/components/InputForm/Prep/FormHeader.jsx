import React from "react";


const FormHeader = ({ title, subtitle }) => {
  return (
  <div className="text-center mb-6 bg-[#F9D232] p-4 rounded">
    <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
    <p className="text-sm text-gray-600">{subtitle}</p>
  </div>
  );
};


export default FormHeader