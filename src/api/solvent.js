


/*---------------------------------------New Functions for Ranking Dashboard-------------------------------- */


// // GET: Fetch solvent dashboard data for single date or date range
// export async function fetchSolventDashboard(payload) {
//   try {
//     const token = localStorage.getItem("accessToken");
//     const url = new URL(`${API_BASE}/api/solvent/dashboard`, window.location.origin);
    
//     // Handle different payload types
//     if (payload.date) {
//       // Single date
//       url.searchParams.append("date", payload.date);
//     } else if (payload.dateRange) {
//       // Date range format: "YYYY-MM-DD YYYY-MM-DD"
//       const [startDate, endDate] = payload.dateRange.split(" ");
//       url.searchParams.append("startDate", startDate);
//       url.searchParams.append("endDate", endDate);
//     }

//     console.log("Fetching solvent dashboard with URL:", url.toString());

//     const response = await fetch(url, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         ...(token ? { Authorization: `Bearer ${token}` } : {})
//       },
//       credentials: "include"
//     });

//     return await handleResponse(response);
//   } catch (error) {
//     console.error("Error fetching solvent dashboard:", error);
//     throw error;
//   }
// }

// // GET: Fetch operator summary data for a specific date
// export async function getOperatorSummaryForDate(date) {
//   try {
//     const token = localStorage.getItem("accessToken");
//     const url = new URL(`${API_BASE}/api/solvent/operator-summary`, window.location.origin);
//     url.searchParams.append("date", date);

//     console.log("Fetching operator summary for date:", date);

//     const response = await fetch(url, {
//       method: "GET", 
//       headers: {
//         "Content-Type": "application/json",
//         ...(token ? { Authorization: `Bearer ${token}` } : {})
//       },
//       credentials: "include"
//     });

//     return await handleResponse(response);
//   } catch (error) {
//     console.error("Error fetching operator summary:", error);
//     throw error;
//   }
// }


//api/solvent.js
const API_BASE = import.meta.env.VITE_API_URL || "https://hemraj-operator-performance-system.vercel.app";

/*--------------------------------Data Submission---------------------------------------- */
// Create new solvent entry
export async function submitSolventForm(payload) {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${API_BASE}/api/solvent/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify(payload),
      credentials: "include"
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error;
  }
}

if (import.meta.env.MODE === "development") {
  console.log(" API_BASE =", API_BASE);
}

// Helper: handle response safely
export async function handleResponse(response) {
  
  if(response.status === 404){
    return [];
  }
  if (response.status === 401) {
    // Redirect to 401 error page
    window.location.href = "/401";
    return;
  }
  if (response.status === 403) {
    // Redirect to 401 error page
    window.location.href = "/403";
    return;
  }


  if (!response.ok) {
    const text = await response.text(); // if backend sent an error msg
    throw new Error(`HTTP ${response.status} - ${text}`);
  }
  return response.json();
}

// POST: Create a new solvent entry
export async function createSolvent(data) {
  try {
    const token = localStorage.getItem("accessToken");
    const res = await fetch(`${API_BASE}/api/solvent/create`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    let responseData = null;
    const text = await res.text();

    try {
      responseData = text ? JSON.parse(text) : null;
    } catch {
      responseData = text || null;
    }

    // Debug logging
    console.log("Response status:", res.status);
    console.log("Response headers:", Object.fromEntries(res.headers.entries()));
    console.log("Response data:", responseData);

    if (res.status === 401) {
      console.error("Authentication error - token:", localStorage.getItem("accessToken"));
      return {
        ok: false,
        status: 401,
        data: null,
        message: "Authentication failed. Please try logging in again."
      };
    }

    return {
      ok: res.ok,
      status: res.status,
      data: responseData,
      message: res.ok
        ? responseData?.message || "Solvent log created successfully"
        : responseData?.error || responseData?.message || `Failed with status ${res.status}`,
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      data: err.message || "Network error",
      message: "Network error. Please try again.",
    };
  }
}





/*----------------------------------------- Single Date------------------------------------------------- */

// Step 1: Get all operators for a specific date
export async function getOperatorsForDate(date) {
  console.log("Fetching operators for date:", date);
  try {
    const url = new URL(
      `${API_BASE}/api/solvent/operators`,
      window.location.origin
    );
    url.searchParams.append("date", date);
    const token = localStorage.getItem("accessToken");
    const response = await fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      credentials: "include"
    });
    const data = await handleResponse(response);
    console.log("Operators data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching operators:", error);
    throw error;
  }
}




// Step 4: Get performance parameters for specific operator and date
export async function getOperatorPerformance(date, operatorName) {
  console.log("Fetching performance for:", operatorName, "on", date);
  try {
    const url = new URL(
      `${API_BASE}/api/solvent/operator-performance`,
      window.location.origin
    );
    url.searchParams.append("date", date);
    url.searchParams.append("operatorName", operatorName);
    const token = localStorage.getItem("accessToken");
    const response = await fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      credentials: "include"
    });
    const data = await handleResponse(response);
    console.log("Performance data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching operator performance:", error);
    throw error;
  }
}






// GET: Fetch dashboard summary data
export async function getSolventDashboardData() {
  const res = await fetch(`${API_BASE}/api/solvent/dashboard`);
  return handleResponse(res);
}

// GET: Fetch shift details (optional params for date, shiftId etc.)
export async function getShiftDetails(queryParams = "") {
  const res = await fetch(`${API_BASE}/api/solvent/shift${queryParams}`);
  return handleResponse(res);
}

// GET: Fetch report data
export async function getReportData(queryParams = "") {
  const res = await fetch(`${API_BASE}/api/solvent/report${queryParams}`);
  return handleResponse(res);
}

// GET: Fetch operator data
export async function getOperatorData(queryParams = "") {
  const res = await fetch(`${API_BASE}/api/solvent/operator${queryParams}`);
  return handleResponse(res);
}











/*------------------------------------------------- Getting Date Range -------------------------------------------- */
// GET: Fetch operators in date range
export async function getOperatorsInRange(startDate, endDate) {
  try {
    const url = new URL(
      `${API_BASE}/api/solvent/operators-range`,
      window.location.origin
    );
    url.searchParams.append("startDate", startDate);
    url.searchParams.append("endDate", endDate);
      const token = localStorage.getItem("accessToken")
    const response = await fetch(url, {
      headers : token ? {Authorization: `Bearer ${token}`} : {},
      credentials: "include"
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error fetching operators in range:", error);
    throw error;
  }
}

// GET: Fetch operator performance in date range
export async function getOperatorPerformanceInRange(startDate, endDate, operatorName) {
  try {
    const url = new URL(
      `${API_BASE}/api/solvent/operator-performance-range`,
      window.location.origin
    );
    url.searchParams.append("startDate", startDate);
    url.searchParams.append("endDate", endDate);
    url.searchParams.append("operatorName", operatorName);

    const token = localStorage.getItem("accessToken");
  
    const response = await fetch(url, {
      headers: token ? {Authorization: `Bearer ${token}`} : {},
      credentials: "include"
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error fetching operator performance in range:", error);
    throw error;
  }
}

// GET: Fetch logs in date range (enhance existing function)
export async function getLogsInRange(startDate, endDate) {
  try {
    const url = new URL(
      `${API_BASE}/api/solvent/`,
      window.location.origin
    );
    url.searchParams.append("startDate", startDate);
    url.searchParams.append("endDate", endDate);
    
    const token = localStorage.getItem("accessToken");
    const response = await fetch(url,{
      headers : token ? { Authorization :  `Bearer ${token}`} : {},
      credentials : "include"
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error fetching logs in range:", error);
    throw error;
  }
}




// GET: Fetch solvent dashboard data for single date or date range
// export async function fetchSolventDashboard(payload) {
//   try {
//     const token = localStorage.getItem("accessToken");
//     const url = new URL(`${API_BASE}/api/solvent/dashboard`, window.location.origin);
    
//     // Handle different payload types
//     if (payload.date) {
//       // Single date
//       url.searchParams.append("date", payload.date);
//     } else if (payload.dateRange) {
//       // Date range format: "YYYY-MM-DD YYYY-MM-DD"
//       const [startDate, endDate] = payload.dateRange.split(" ");
//       url.searchParams.append("startDate", startDate);
//       url.searchParams.append("endDate", endDate);
//     }

//     console.log("Fetching solvent dashboard with URL:", url.toString());

//     const response = await fetch(url, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         ...(token ? { Authorization: `Bearer ${token}` } : {})
//       },
//       credentials: "include"
//     });

//     return await handleResponse(response);
//   } catch (error) {
//     console.error("Error fetching solvent dashboard:", error);
//     throw error;
//   }
// }
export async function fetchSolventDashboard(payload) {
  try {
    const token = localStorage.getItem("accessToken");
    const url = new URL(`${API_BASE}/api/solvent/dashboard`, window.location.origin);
    
    // Handle different payload types
    if (payload.date) {
      url.searchParams.append("date", payload.date);
    } else if (payload.dateRange) {
      const [startDate, endDate] = payload.dateRange.split(" ");
      url.searchParams.append("startDate", startDate);
      url.searchParams.append("endDate", endDate);
    }

    console.log("Dashboard API Call:", url.toString()); // ADD THIS LOG
    console.log("Payload:", payload); // ADD THIS LOG

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      credentials: "include"
    });

    const result = await handleResponse(response);
    console.log("Dashboard Response:", result); // ADD THIS LOG
    
    return result;
  } catch (error) {
    console.error("Error fetching solvent dashboard:", error);
    throw error;
  }
}

// GET: Fetch operator summary data for a specific date
export async function getOperatorSummaryForDate(date) {
  try {
    const token = localStorage.getItem("accessToken");
    const url = new URL(`${API_BASE}/api/solvent/operator-summary`, window.location.origin);
    url.searchParams.append("date", date);

    console.log("Fetching operator summary for date:", date);

    const response = await fetch(url, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      credentials: "include"
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Error fetching operator summary:", error);
    throw error;
  }
}