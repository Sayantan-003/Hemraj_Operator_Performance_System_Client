
import axios from "axios";

export const fetchPrepDashboard = async ({ date }) => {
  try {
    console.log("📥 [Frontend] Sending to API:", { date });

    const response = await axios.post(
      "https://hemraj-operator-performance-system.vercel.app/api/prep/dashboard",
      { date }
    );

    console.log(" [Frontend] API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(" [Frontend] API Error:", error);
    throw error;
  }
};






