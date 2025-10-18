import React, { useState,useCallback } from "react";
import { useNavigate } from "react-router-dom";
import DeGum_Bleach_Form from "./DeGum_Bleach_Form";
import DeWaxing_Form from "./DeWaxing_Form";
import DEO_Form from "./DEO_Form";
import Alfa_Form from "./Alfa_Form";



export default function MasterRefineryForm() {

  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    degumBleach: {},
    alpha: {},
    deo: {},
    dewaxing: {}
  });
  
  const [loading, setLoading] = useState(false);
  const [showJson, setShowJson] = useState(false);
  const [showSuccessPage, setShowSuccessPage] = useState(false);

  const handleDegumBleachChange = useCallback((data) => {
    setFormData(prev => ({ ...prev, degumBleach: data }));
  },[]);

  const handleAlphaChange = useCallback((data) => {
    setFormData(prev => ({ ...prev, alpha: data }));
  },[]);

  const handleDeoChange = useCallback((data) => {
    setFormData(prev => ({ ...prev, deo: data }));
  },[]);

  const handleDewaxingChange = useCallback((data) => {
    setFormData(prev => ({ ...prev, dewaxing: data }));
  },[]);

  const handleSubmitAll = async () => {
    setLoading(true);
    
    // Simulate API submission
    try {
      console.log("Submitting combined form data:", formData);
      
      // Here you would normally send to your API
      // const response = await fetch("/api/refinery-forms", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });
      
      // Simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert("All forms submitted successfully!");
      setShowJson(true);
      setShowSuccessPage(true);
    } catch (error) {
      console.error("Error submitting forms", error);
      alert("Error occurred while submitting forms.");
    } finally {
      setLoading(false);
    }
  };

   if (showSuccessPage) {
     navigate('/success');
  }
  



  return (
    <div className="max-w-6xl mx-auto p-4 mb-10 mt-10">

      {/* DeGum & Bleach Form */}
      <DeGum_Bleach_Form onDataChange={handleDegumBleachChange} />

      {/* Alpha Form */}
      <Alfa_Form onDataChange={handleAlphaChange} />

      {/* DeWaxing Form */}
      <DeWaxing_Form onDataChange={handleDewaxingChange} />

       {/* DEO Form */}
      <DEO_Form onDataChange={handleDeoChange} />

      {/* Submit Button */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6 text-center">
        <button 
          onClick={handleSubmitAll} 
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-8 rounded-sm text-sm transition-colors duration-200"
        >
          {loading ? "Submitting..." : "Submit All Forms"}
        </button>
        
        <button 
          onClick={() => setShowJson(!showJson)}
          className="ml-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-sm text-sm transition-colors duration-200"
        >
          {showJson ? "Hide" : "Show"} JSON Preview
        </button>
      </div>

      {/* JSON Preview */}
      {showJson && (
        <div className="bg-white rounded-xl shadow-md p-6 ">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 px-4 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>
            JSON Output Preview
          </h3>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}