import FormHeader from "./FormHeader";

const ProductionSection = ({
  productionCrude,
  productionDORB,
  batches,
  onCrudeChange,
  onDORBChange,
  onBatchChange,
}) => {
  const shifts = ["shiftA", "shiftB", "shiftC"];

  return (
    <>
      {/*Production Entry*/}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <FormHeader title="Production Entry" />
        {/* Total Crude & DORB Production (side by side) */}
        <div className="mt-6 w-full flex justify-center">
          <div className="w-3/4 grid grid-cols-2 gap-6">
            {/* Crude Oil Production */}
            <div>
              <FormHeader
                title="Total Crude Oil Production"
                className="text-center text-lg font-semibold mb-2"
              />
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="Enter total Crude Oil production"
                value={productionCrude || ""}
                onChange={(e) => onCrudeChange(e.target.value)}
                className="border rounded px-3 py-2 w-full mb-5 text-center"
              />
            </div>

            {/* DORB Production */}
            <div>
              <FormHeader
                title="Total DORB Production"
                className="text-center text-lg font-semibold mb-2"
              />
              <input
                type="text"
                placeholder="Enter total DORB production"
                value={productionDORB || ""}
                onChange={(e) => onDORBChange(e.target.value)}
                className="border rounded px-3 py-2 w-full mb-5 text-center"
              />
            </div>
          </div>
        </div>

        {/* All shifts in one row */}
        <FormHeader
          title="Batch Entries"
          className="text-center text-lg font-semibold w-1/2"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {shifts.map((shift, idx) => (
            <div key={shift} className="flex flex-col items-center">
              <h3
                className="text-md font-semibold text-center w-full text-white px-2 py-1 rounded mb-2"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #f9804c, #fab07c)",
                }}
              >
                Shift {String.fromCharCode(65 + idx)}
              </h3>
              <input
                type="number"
                min="0"
                placeholder={`No. Of Batches in ${shift}`}
                value={batches?.[shift]?.value || ""}
                onChange={(e) => onBatchChange(shift, "value", e.target.value)}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductionSection;
