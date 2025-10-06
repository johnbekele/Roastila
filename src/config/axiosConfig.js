import axios from "axios";
import { API_URL } from "./EnvConfig";

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 15000, // 15 seconds timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  // Add retry configuration
  retry: 2,
  retryDelay: 1000,
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🚀 [API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("❌ [API] Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and retry logic
apiClient.interceptors.response.use(
  (response) => {
    console.log(
      `✅ [API] ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`
    );
    return response;
  },
  async (error) => {
    const config = error.config;

    // Retry logic for network errors and timeouts
    if (!config || !config.retry) {
      config.retry = 0;
    }

    const shouldRetry =
      config.retry < 2 &&
      (error.code === "ECONNABORTED" ||
        error.message === "Network Error" ||
        !error.response);

    if (shouldRetry) {
      config.retry += 1;
      console.log(
        `🔄 [API] Retrying request (${config.retry}/2): ${config.url}`
      );

      // Wait before retrying
      await new Promise((resolve) =>
        setTimeout(resolve, config.retryDelay || 1000)
      );

      return apiClient(config);
    }

    // Handle different error types
    if (error.code === "ECONNABORTED") {
      console.error("❌ [API] Request timeout:", error.config?.url);
      error.message = "Request timeout - please check your connection";
    } else if (error.response) {
      // Server responded with error status
      console.error(
        `❌ [API] ${error.response.status} ${error.response.statusText}:`,
        error.response.data
      );
    } else if (error.request) {
      // Request was made but no response received
      console.error("❌ [API] No response received:", error.request);
      error.message = "No response from server - please check your connection";
    } else {
      // Something else happened
      console.error("❌ [API] Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
