import FormHeader from "./FormHeader";

const SteamSection = ({ steamReadings, onChange }) => {
  const steam = steamReadings;
  const shifts = ["shiftA", "shiftB", "shiftC"];

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6 py -7">
      <FormHeader title="Steam Entry" />

      {/* Container for all shifts in one row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py -5">
        {shifts.map((shift, idx) => (
          <div key={shift} className="flex flex-col items-center">
            <h3
              className="text-md font-semibold text-center w-full text-white px-2 py-1 rounded mb-2"
              style={{
                backgroundImage: "linear-gradient(to right, #f9804c, #fab07c)",
              }}
            >
              Shift {String.fromCharCode(65 + idx)}
            </h3>
            <input
              type="text"
              placeholder={`Steam Consumed in ${shift}`}
              value={steam[shift]?.steam || ""}
              onChange={(e) => onChange(shift, "steam", e.target.value)}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SteamSection;
