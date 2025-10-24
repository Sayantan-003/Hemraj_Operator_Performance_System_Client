// import FormHeader from "./FormHeader";

// const ProductionSection = ({
//   productionCrude,
//   productionDORB,
//   batches,
//   onCrudeChange,
//   onDORBChange,
//   onBatchChange,
// }) => {
//   const shifts = ["shiftA", "shiftB", "shiftC"];

//   return (
//     <>
//       {/*Production Entry*/}
//       <div className="bg-white rounded-lg shadow p-4 mb-6">
//         <FormHeader title="Production Entry" />
//         {/* Total Crude & DORB Production (side by side) */}
//         <div className="mt-6 w-full flex justify-center">
//           <div className="w-3/4 grid grid-cols-2 gap-6">
//             {/* Crude Oil Production */}
//             <div>
//               <FormHeader
//                 title="Total Crude Oil Production"
//                 className="text-center text-lg font-semibold mb-2"
//               />
//               <input
//                 type="number"
//                 step="0.01"
//                 min="0"
//                 placeholder="Enter total Crude Oil production"
//                 value={productionCrude || ""}
//                 onChange={(e) => onCrudeChange(e.target.value)}
//                 className="border rounded px-3 py-2 w-full mb-5 text-center"
//               />
//             </div>

//             {/* DORB Production */}
//             <div>
//               <FormHeader
//                 title="Total DORB Production"
//                 className="text-center text-lg font-semibold mb-2"
//               />
//               <input
//                 type="text"
//                 placeholder="Enter total DORB production"
//                 value={productionDORB || ""}
//                 onChange={(e) => onDORBChange(e.target.value)}
//                 className="border rounded px-3 py-2 w-full mb-5 text-center"
//               />
//             </div>
//           </div>
//         </div>

//         {/* All shifts in one row */}
//         <FormHeader
//           title="Batch Entries"
//           className="text-center text-lg font-semibold w-1/2"
//         />
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {shifts.map((shift, idx) => (
//             <div key={shift} className="flex flex-col items-center">
//               <h3
//                 className="text-md font-semibold text-center w-full text-white px-2 py-1 rounded mb-2"
//                 style={{
//                   backgroundImage:
//                     "linear-gradient(to right, #f9804c, #fab07c)",
//                 }}
//               >
//                 Shift {String.fromCharCode(65 + idx)}
//               </h3>
//               <input
//                 type="number"
//                 min="0"
//                 placeholder={`No. Of Batches in ${shift}`}
//                 value={batches?.[shift]?.value || ""}
//                 onChange={(e) => onBatchChange(shift, "value", e.target.value)}
//                 className="border rounded px-3 py-2 w-full"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductionSection;

import FormHeader from "./FormHeader";
import { useMemo } from "react";

const ProductionSection = ({
  productionCrude,
  productionDORB,
  bagsFeed,
  batches,
  onCrudeChange,
  onDORBChange,
  onBagsFeedChange,
  onBatchChange,
}) => {
  const shifts = ["shiftA", "shiftB", "shiftC"];

  // Calculate Expected DORB Production (in kg)
  const expectedDORBProduction = useMemo(() => {
    const feedingKg = (Number(bagsFeed) || 0) * 1000;
    const crudeKg = (Number(productionCrude) || 0) * 1000;
    return Math.max(0, feedingKg - crudeKg);
  }, [bagsFeed, productionCrude]);

  // Calculate Average Weight of DORB Bags (in kg per bag)
  const avgWeightDORBBags = useMemo(() => {
    const totalBags = Number(productionDORB) || 0;
    if (totalBags === 0) return 0;
    return expectedDORBProduction / totalBags;
  }, [expectedDORBProduction, productionDORB]);

  return (
    <>
      {/*Production Entry*/}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <FormHeader title="Production Entry" />

        {/* Input Fields - Three columns */}
        <div className="mt-6 w-full flex justify-center">
          <div className="w-full grid grid-cols-3 gap-6">
            {/* Crude Oil Production */}
            <div>
              <FormHeader
                title="Total Crude Oil Production (MT)"
                className="text-center text-lg font-semibold mb-2"
              />
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="Enter Crude Oil production"
                value={productionCrude || ""}
                onChange={(e) => onCrudeChange(e.target.value)}
                className="border rounded px-3 py-2 w-full mb-5 text-center"
              />
            </div>

            {/* DORB Production */}
            <div>
              <FormHeader
                title="Total DORB Production (Bags)"
                className="text-center text-lg font-semibold mb-2"
              />
              <input
                type="number"
                min="0"
                placeholder="Enter DORB production"
                value={productionDORB || ""}
                onChange={(e) => onDORBChange(e.target.value)}
                className="border rounded px-3 py-2 w-full mb-5 text-center"
              />
            </div>

            {/* Total Bags Feed */}
            <div>
              <h3
                className="text-center text-white font-semibold text-lg px-2 py-3 rounded mb-3"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #f9804c, #fab07c)",
                }}
              >
                Total Feeding (Tons)
              </h3>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="Enter total feeding"
                value={bagsFeed || ""}
                onChange={(e) => onBagsFeedChange(e.target.value)}
                className="border rounded px-3 py-2 w-full mb-5 text-center"
              />
            </div>
          </div>
        </div>

        {/* Calculated Values Display - Read-only */}
        <div className="mt-4 mb-6 w-full flex justify-center">
          {/* <div className="w-full grid grid-cols-2 gap-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-2 border-blue-200"> */}
          {/* Expected DORB Production */}
          {/* <div className="text-center">
              <p className="text-sm font-semibold text-gray-600 mb-1">
                Expected DORB Production
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {expectedDORBProduction.toFixed(2)} KG
              </p>
              <p className="text-xs text-gray-500 mt-1">
                (Feeding - Crude Oil) × 1000
              </p>
            </div> */}

          {/* Average Weight of DORB Bags */}
          {/* <div className="text-center">
              <p className="text-sm font-semibold text-gray-600 mb-1">
                Avg. Weight per DORB Bag
              </p>
              <p className="text-2xl font-bold text-green-600">
                {avgWeightDORBBags.toFixed(2)} KG
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Expected DORB ÷ Total Bags
              </p>
            </div> */}
          {/* </div> */}
        </div>

        {/* Batch Entries */}
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
