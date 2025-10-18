import React, { useState, useRef } from "react";
import SimpleLogoutHeader from "../SimpleLogoutHeader";
import { Navigate, useNavigate } from "react-router-dom";
import FormHeader from "./FormHeader";
import OperatorDetails from "./OperatorDetails";
import SteamEntrySection from "./SteamEntrySection";
import AmpereLoadSection from "./AmpereLoadSection";
import FeedingSection from "./FeedingSection";
import prepOperatorNames from "../../../constants/prepOperatorNames";
import { createPrepEntry } from "../../../api/prep"; // <-- API function

const operatorNames = prepOperatorNames;

const NewPrepForm = () => {
  const navigate = useNavigate();
  const [numOperators, setNumOperators] = useState(1);
  const [operatorData, setOperatorData] = useState(Array(1).fill({}));
  const [date, setDate] = useState("");

  // Refs for sections
  const steamRef = useRef();
  const ampereRef = useRef();
  const feedingRef = useRef();

  // Handle operator count change
  const handleNumOperatorsChange = (e) => {
    const value = parseInt(e.target.value);
    setNumOperators(value);
    setOperatorData(Array(value).fill({}));
  };

  // Handle operator details data change
  const handleOperatorDataChange = (index, newData) => {
    const updated = [...operatorData];
    updated[index] = newData;
    setOperatorData(updated);
  };

  // Handle form submit
  const handleSubmit = async () => {
    // Get data from sections
    const steamData = steamRef.current.getData();
    const ampereData = ampereRef.current.getData();
    const feedingData = feedingRef.current.getData();

    const payload = {
      date,
      operatorDetails: operatorData,
      steamEntries: steamData,
      ampereLoadEntries: ampereData,
      feedingEntries: feedingData,
    };

    console.log("📤 Payload to be sent:", payload);

    try {
      const result = await createPrepEntry(payload);
      alert("✅ Form submitted successfully!");
      console.log("Server Response:", result);
      navigate('/success');

      // Reset form after submit
      setDate("");
      setNumOperators(1);
      setOperatorData(Array(1).fill({}));
    } catch (error) {
      alert("❌ Error submitting form: " + error.message);
      console.error("Form Submission Error:", error);
    }
  };

  return (
    <>
      <SimpleLogoutHeader />
      <div
        className="p-6 min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/your-background-image.jpg')" }}
      >
        <div className="bg-[#EEE5D5] p-6 rounded-lg shadow-lg">
        <FormHeader
          title="Operator Performance Form"
          subtitle="(Prep Section)"
        />

        {/* Date & Operator Count */}
        <div className="bg-white p-4 rounded-xl shadow mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">Date</label>
              <input
                type="date"
                className="w-full border rounded px-3 py-2"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Number of Operator Present
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                value={numOperators}
                onChange={handleNumOperatorsChange}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>
          </div>
        </div>

        {/* Operator Details */}
        <div className="bg-gray-100 p-4 rounded-xl shadow mb-6">
          <h2 className="font-bold text-lg mb-4 bg-[#F0CB8A] p-2 rounded">
            Operator Details
          </h2>
          {Array.from({ length: numOperators }).map((_, index) => (
            <OperatorDetails
              key={index}
              index={index}
              value={operatorData[index]}
              onChange={handleOperatorDataChange}
              operatorNames={operatorNames}
            />
          ))}
        </div>

        {/* Sections with refs */}
        <SteamEntrySection ref={steamRef} />
        <AmpereLoadSection ref={ampereRef} />
        <FeedingSection ref={feedingRef} />

        {/* Submit button */}
        <div className="text-center">
          <button
            className="bg-[#ACFD8B] text-gray-800 px-6 py-2 rounded-lg font-semibold hover:shadow-md transition duration-300"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        </div>
      </div>
    </>
  );
};

export default NewPrepForm;
