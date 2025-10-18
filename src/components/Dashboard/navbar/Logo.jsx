import React from "react";
import Hemraj_logo from '../../../assets/images/Hemraj_logo.png'

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <div className="w-auto h-auto bg-white rounded-full opacity-90"></div>
        <img src={Hemraj_logo} alt="Hemraj Logo" className="w-full h-12  " />
          
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-medium text-gray-800 leading-tight">Operator</span>
        <span className="text-xs font-semibold text-gray-500 leading-tight">Performance System</span>
      </div>
    </div>
  );
};

export default Logo;