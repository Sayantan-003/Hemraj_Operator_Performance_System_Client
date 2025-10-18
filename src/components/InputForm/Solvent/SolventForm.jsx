import React, { useState, useEffect } from "react";
import SimpleLogoutHeader from "../../../utils/SimpleLogoutHeader.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createSolvent } from "../../../api/solvent.js";
import OperatorSection from "./OperatorSection.jsx";
import LabReportSection from "./LabReportSection.jsx";
import SteamSection from "./SteamSection.jsx";
import ProductionSection from "./ProductionSection.jsx";
import solventOperatorNames from "../../../constants/solventOperatorNames.js";
import FormHeader from "./FormHeader.jsx";
import AmpereLoadSection from "./AmpereLoadSection.jsx";

const operatorNames = solventOperatorNames;

const SolventForm = () => {
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const [numOperators, setNumOperators] = useState(1);
  const [operatorDetails, setOperatorDetails] = useState([
    { name: "", shiftHour: "", shiftName: "" },
  ]);
  const [labReport, setLabReport] = useState({
    shiftA: {},
    shiftB: {},
    shiftC: {},
  });
  const [steam, setSteam] = useState({ shiftA: {}, shiftB: {}, shiftC: {} });
  const [ampereLoad, setAmpereLoad] = useState({
    shiftA: {},
    shiftB: {},
    shiftC: {},
  });
  const [batches, setBatches] = useState({
    shiftA: {},
    shiftB: {},
    shiftC: {},
  });
  const [totalCrudeOilProduction, setTotalCrudeOilProduction] = useState("");
  const [totalDORBProduction, setTotalDORBProduction] = useState("");

  const handleOperatorChange = (index, value) => {
    const updated = [...operatorDetails];
    updated[index] = value;
    setOperatorDetails(updated);
  };

  const handleLabChange = (shift, field, value) => {
    setLabReport((prev) => ({
      ...prev,
      [shift]: { ...prev[shift], [field]: value },
    }));
  };

  const handleSteamChange = (shift, type, value) => {
    setSteam((prev) => ({
      ...prev,
      [shift]: { ...prev[shift], [type]: value },
    }));
  };

  const handleBatchesChange = (shift, field, value) => {
    setBatches((prev) => ({
      ...prev,
      [shift]: {
        ...prev[shift],
        [field]: value,
      },
    }));
  };

  const handleAmpereLoadChange = (shift, field, value) => {
    setAmpereLoad((prev) => ({
      ...prev,
      [shift]: { ...prev[shift], [field]: value },
    }));
  };

  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });

  const handleSubmit = async () => {
    if (!date) {
      setSubmitStatus({
        loading: false,
        error: " ⚠️ Please select a date",
        success: false,
      });
      toast.error("Please select a date");
      return;
    }

    if (
      !operatorDetails[0].name ||
      !operatorDetails[0].shiftHour ||
      !operatorDetails[0].shiftName
    ) {
      setSubmitStatus({
        loading: false,
        error: "⚠️ Please fill operator details",
        success: false,
      });
      toast.error("⚠️ Please fill operator details");
      return;
    }

    try {
      setSubmitStatus({ loading: true, error: null, success: false });

      // Transform frontend state → backend format
      const payload = {
        date,
        operators: operatorDetails.map((op, idx) => ({
          id: `op${idx + 1}`,
          name: op.name,
          shiftHour: op.shiftHour,
          shiftName: op.shiftName,
        })),

        steamReadings: Object.entries(steam).map(([shiftId, values]) => ({
          shiftId,
          consumed: Number(values.steam ?? 0),
        })),
        labReports: Object.entries(labReport)
          .filter(([_, values]) => Object.keys(values).length > 0) // Only include shifts that have data
          .map(([shiftId, values]) => ({
            shiftId: shiftId.toLowerCase(),
            colour: Number(values.colour) || 0,
            moisture: Number(values.moisture) || 0,
            dorb: Number(values.dorb) || 0,
          })),
        batches: Object.entries(batches).map(([shiftId, values]) => ({
          shiftId,
          value: Number(values.value ?? 0),
        })),
        totalCrudeOilProduction: Number(totalCrudeOilProduction ?? 0),
        totalDORBProduction: Number(totalDORBProduction ?? 0),
        ampereLoad: Object.entries(ampereLoad).map(([shiftId, values]) => ({
          shiftId,
          value: Number(values.value ?? 0),
        })),
      };

      console.log("Submitting payload:", payload);

      console.log("Access Token:", localStorage.getItem("accessToken")); // Debug line
      const result = await createSolvent(payload);

      if (!result.ok) {
        console.error("Server error response:", result); // Debug line
        throw new Error(result.message || "Server returned an error");
      }

      console.log("Server response:", result.data);
      setSubmitStatus({ loading: false, error: null, success: true });
      toast.success(result.message || "Data saved successfully");
      navigate("/success");

      // Reset form
      setDate("");
      setOperatorDetails([{ name: "", shiftHour: "", shiftName: "" }]);
      setNumOperators();
      setLabReport({ shiftA: {}, shiftB: {}, shiftC: {} });
      setSteam({ shiftA: {}, shiftB: {}, shiftC: {} });
      setBatches({ shiftA: {}, shiftB: {}, shiftC: {} });
      setTotalDORBProduction("");
      setTotalCrudeOilProduction("");
      setAmpereLoad({ shiftA: {}, shiftB: {}, shiftC: {} });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({ loading: false, error: error.message, success: false });
      toast.error(error.message || " 🛑 Failed to save data");
    }
  };

  useEffect(() => {
    setOperatorDetails((prev) => {
      const updated = [...prev];
      while (updated.length < numOperators) {
        updated.push({ name: "", shiftHour: "", shiftName: "" });
      }
      return updated.slice(0, numOperators);
    });
  }, [numOperators]);

  return (
    <>
      <SimpleLogoutHeader />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-6 px-4">
        <FormHeader
          title="Operator Performance Form"
          subtitle="Solvent Section"
          className="py-3"
        />
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-4 bg-white">
          <label className=" text-sm font-medium bg-white text-gray-700">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <OperatorSection
          operatorData={operatorDetails}
          numOperators={numOperators}
          onCountChange={(e) => setNumOperators(+e.target.value)}
          onChange={handleOperatorChange}
          operatorNames={operatorNames}
        />
        <LabReportSection labReport={labReport} onChange={handleLabChange} />
        <SteamSection steamReadings={steam} onChange={handleSteamChange} />
        {/* <ProductionSection
          batches={batches}
          totalProductionp = {totalProduction}
          onChange={handleBatchesChange}
        /> */}
        <ProductionSection
          batches={batches}
          productionCrude={totalCrudeOilProduction }
          productionDORB={ totalDORBProduction }
          onCrudeChange={setTotalCrudeOilProduction}
          onDORBChange={setTotalDORBProduction}
          onBatchChange={handleBatchesChange}
        />

        <AmpereLoadSection
          ampereLoad={ampereLoad}
          onChange={handleAmpereLoadChange}
        />

        <div className="text-center space-y-4">
          {submitStatus.error && (
            <div className="text-red-600 bg-white p-3 rounded">
              {submitStatus.error}
            </div>
          )}
          {submitStatus.success && (
            <div className="text-green-600 bg-green-50 p-3 rounded">
              Data saved successfully!
            </div>
          )}
          <button
            onClick={handleSubmit}
            disabled={submitStatus.loading}
            className={`bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 \${
            submitStatus.loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          >
            {submitStatus.loading ? "Saving..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default SolventForm;
