//App.jsx
import React, { useState, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Dashboard/navbar/Navbar.jsx";
import DateSelector from "../src/components/Dashboard/SolventReport/Solvent_DateSelector/DateSelector.jsx";
import SolventReport from "./components/Dashboard/SolventReport/SolventReport.jsx";
import PrepReport from "./components/Dashboard/PrepReport/PrepReport.jsx";
import Footer from "./components/Dashboard/Footer/Footer.jsx";
import DeGummingAndBleachingoSectionReport from "./components/Dashboard/RefineryReport/DeGummingAndBleachingSection/DeGummingAndBleachingSectionReport.jsx";
import AlphaSectionReport from "./components/Dashboard/RefineryReport/AlfhaSection/AlfaSectionReport.jsx";
import DeWaxingSectionReport from "./components/Dashboard/RefineryReport/DeWaxingSection/DeWaxingSectionReport.jsx";
import DEOSectionReport from "./components/Dashboard/RefineryReport/DEOSection/DEOSectionReport.jsx";

// Form Pages
import PerpFormPage from "./pages/PrepFormPage.jsx";
import SolventFormPage from "./pages/SolventFormPage.jsx";
import RefineryFormPage from "./pages/RefineryFormPage.jsx";

// Error Pages
import NotFound404 from "./components/ErrorPages/NotFound404.jsx";
import InternalServer500 from "./components/ErrorPages/InternalServer500.jsx"; 
import AccessDenied403 from "./components/ErrorPages/AccessDenied403.jsx";
import UnauthorizedAccess401 from './components/ErrorPages/UnauthorizedAccess401.jsx';

/* Utility Pages */
import SuccessPage from "./utils/SuccessPage.jsx";

// Auth
import { AuthProvider, AuthContext } from "./context/AuthContext.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import LoginPage from "./pages/LoginPage.jsx";

//   const [selectedDate, setSelectedDate] = useState(null);

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   // Updated role configuration with super_admin access to everything
//   const roleConfig = {
//     dashboards: {
//       prep: ["prep_admin", "super_admin", "admin4"],
//       solvent: ["solvent_admin", "super_admin", "admin4"], 
//       refinery: ["refinery_admin", "super_admin"]
//     },
//     forms: {
//       prep: ["input_user_2", "master_input_user", "super_admin"],
//       solvent: ["input_user_3", "master_input_user", "super_admin"],
//       refinery: ["input_user_1", "master_input_user", "super_admin"]
//     }
//   };

//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           {/* Public */}
//           <Route path="/login" element={<LoginPage />} />

//           {/* Root Dashboard (admins only) */}
//           <Route
//             path="/"
//             element={
//               <ProtectedRoute
//                 allowedRoles={[
//                   ...roleConfig.dashboards.prep,
//                   ...roleConfig.dashboards.solvent,
//                   ...roleConfig.dashboards.refinery,
//                 ]}
//               >
//                 <>
//                   <Navbar />
//                   <div className="h-60 mt-6 pt-1 bg-gradient-to-r from-blue-100 to-blue-50 flex items-center justify-center rounded-md">
//                     <DateSelector onChange={handleDateChange} />
//                   </div>
//                   <RoleBasedReports roleConfig={roleConfig} />
//                   <Footer />
//                 </>
//               </ProtectedRoute>
//             }
//           />

//           {/* Forms (input users + super_admin) */}
//           <Route
//             path="/prep-form"
//             element={
//               <ProtectedRoute allowedRoles={['input_user_3', 'master_input_user', 'super_admin']}>
//                 <PerpFormPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/solvent-form"
//             element={
//               <ProtectedRoute allowedRoles={['input_user_3', 'master_input_user', 'super_admin']}>
//                 <SolventFormPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/refinery-form"
//             element={
//               <ProtectedRoute allowedRoles={['input_user_1', 'master_input_user', 'super_admin']}>
//                 <RefineryFormPage />
//               </ProtectedRoute>
//             }
//           />

//           {/* Error + Utility */}
//           <Route path="*" element={<NotFound404 />} />
//           <Route path="/500" element={<InternalServer500 />} />
//           <Route path="/403" element={<AccessDenied403 />} />
//           <Route path="/401" element={<UnauthorizedAccess401 />} />
//           <Route path="/success" element={<SuccessPage />} />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// };

// // Helper: Role-based dashboards
// const RoleBasedReports = ({ roleConfig }) => {
//   const { user } = useContext(AuthContext);

//   if (!user || !user.role) {
//     return (
//       <div className="flex items-center justify-center py-12">
//         <div className="text-gray-500">Loading dashboard...</div>
//       </div>
//     );
//   }

//   return (
//     <>
//       {roleConfig.dashboards.prep.includes(user.role) && (
//         <div id="prep-report">
//           <PrepReport />
//         </div>
//       )}
      
//       {roleConfig.dashboards.solvent.includes(user.role) && (
//         <div id="solvent-report">
//           <SolventReport />
//         </div>
//       )}
      
//       {roleConfig.dashboards.refinery.includes(user.role) && (
//         <div id="refinery-report">
//           <DeGummingAndBleachingoSectionReport />
//           <AlphaSectionReport />
//           <DeWaxingSectionReport />
//           <DEOSectionReport />
//         </div>
//       )}
//     </>
//   );
// };

// export default App;



//App.jsx

// Helper: Role-based dashboards
const RoleBasedReports = ({ roleConfig }) => {
  const { user } = useContext(AuthContext);

  if (!user || !user.role) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <>
      {roleConfig.dashboards.prep.includes(user.role) && (
        <div id="prep-report">
          <PrepReport />
        </div>
      )}
      
      {roleConfig.dashboards.solvent.includes(user.role) && (
        <div id="solvent-report">
          <SolventReport />
        </div>
      )}
      
      {roleConfig.dashboards.refinery.includes(user.role) && (
        <div id="refinery-report">
          <DeGummingAndBleachingoSectionReport />
          <AlphaSectionReport />
          <DeWaxingSectionReport />
          <DEOSectionReport />
        </div>
      )}
    </>
  );
};

const App = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Updated role configuration
  const roleConfig = {
    dashboards: {
      prep: ["prep_admin", "super_admin", "admin4"],
      solvent: ["solvent_admin", "super_admin", "admin4"], 
      refinery: ["refinery_admin", "super_admin"]
    },
    forms: {
      prep: ["input_user_2", "master_input_user", "super_admin"],
      solvent: ["input_user_3", "master_input_user", "super_admin"],
      refinery: ["input_user_1", "master_input_user", "super_admin"]
    }
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />

          {/* Root Dashboard */}
          <Route
            path="/"
            element={
              <ProtectedRoute
                allowedRoles={[
                  ...roleConfig.dashboards.prep,
                  ...roleConfig.dashboards.solvent,
                  ...roleConfig.dashboards.refinery,
                ]}
              >
                <>
                  <Navbar />
                  <RoleBasedReports roleConfig={roleConfig} />
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />

          <Route
            path="/prep-form"
            element={
              <ProtectedRoute allowedRoles={roleConfig.forms.prep}>
                <PerpFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/solvent-form"
            element={
              <ProtectedRoute allowedRoles={roleConfig.forms.solvent}>
                <SolventFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/refinery-form"
            element={
              <ProtectedRoute allowedRoles={roleConfig.forms.refinery}>
                <RefineryFormPage />
              </ProtectedRoute>
            }
          />

          {/* Error + Utility */}
          <Route path="*" element={<NotFound404 />} />
          <Route path="/500" element={<InternalServer500 />} />
          <Route path="/403" element={<AccessDenied403 />} />
          <Route path="/401" element={<UnauthorizedAccess401 />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};


export default App;