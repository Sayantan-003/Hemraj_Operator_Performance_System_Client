// // src/components/auth/ProtectedRoute.jsx
// import React, { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "./context/AuthContext";

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { user, isAuthenticated } = useContext(AuthContext);

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   if(user.role === 'super_admin'){
//     return children;
//   }

//   if(user.role === 'master_input_user') {
//     return children;
//   }

//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     return <Navigate to="/403" replace />; // Forbidden page
//   }

//   return children;
// };

// export default ProtectedRoute;



// src/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useContext(AuthContext);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // If no role restrictions, allow access
  if (!allowedRoles || allowedRoles.length === 0) {
    return children;
  }

  // Check if user's role is in the allowed roles
  const hasAccess = allowedRoles.includes(user.role);

  // Debug logging (remove in production)
  console.log('ProtectedRoute Debug:', {
    userRole: user.role,
    allowedRoles,
    hasAccess,
    route: window.location.pathname
  });

  // Grant or deny access
  if (hasAccess) {
    return children;
  } else {
    return <Navigate to="/403" replace />;
  }
};

export default ProtectedRoute;