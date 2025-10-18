// client/src/api/prep.js


const API_BASE = import.meta.env.VITE_API_URL || "https://hemraj-operator-performance-system.vercel.app";

if (import.meta.env.MODE === "development") {
  console.log("🌐 API_BASE =", API_BASE);
}

// Helper: handle response safely (copied from solvent.js)
export async function handleResponse(response) {
  if (response.status === 404) {
    return [];
  }
  if (response.status === 401) {
    window.location.href = "/401";
    return;
  }
  if (response.status === 403) {
    window.location.href = "/403";
    return;
  }
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP ${response.status} - ${text}`);
  }
  return response.json();
}

/**
 * Generic API request helper
 * Handles JSON parsing, errors, and query params automatically.
 */

async function apiRequest(endpoint, method = "GET", data = null, queryParams = "") {
  try {
    let url = `${API_BASE}${endpoint}`;
    if (queryParams) {
      url += queryParams.startsWith("?") ? queryParams : `?${queryParams}`;
    }
    const token = localStorage.getItem("accessToken");
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      credentials: "include"
    };
    if (data) {
      console.log("📤 Sending Data to Backend:", data);
      options.body = JSON.stringify(data);
    }
    console.log(`🔗 API Request → [${method}] ${url}`);
    const response = await fetch(url, options);
    // Use handleResponse for consistent error handling
    return await handleResponse(response);
  } catch (error) {
    console.error(`❌ API Error [${method}] ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Create a new prep entry (POST)
 * @param {Object} data - Form data payload
 */

export async function createPrepEntry(data) {
  console.log("📝 Form Data Submitted:", data);
  return apiRequest("/api/prep/create", "POST", data);
}

/**
 * Get prep dashboard summary (GET)
 */

export async function getPrepDashboardData() {
  return apiRequest("/api/prep/dashboard", "GET");
}

/**
 * Get shift details (GET)
 * @param {String} queryParams - Example: "?date=2025-08-27&shiftId=1"
 */

export async function getPrepShiftDetails(queryParams = "") {
  return apiRequest("/api/prep/shift", "GET", null, queryParams);
}

/**
 * Get prep report data (GET)
 * @param {String} queryParams - Example: "?startDate=2025-08-01&endDate=2025-08-27"
 */

export async function getPrepReportData(queryParams = "") {
  return apiRequest("/api/prep/report", "GET", null, queryParams);
}

/**
 * Get prep operator data (GET)
 * @param {String} queryParams - Example: "?operatorName=John"
 */

export async function getPrepOperatorData(queryParams = "") {
  return apiRequest("/api/prep/operator", "GET", null, queryParams);
}
