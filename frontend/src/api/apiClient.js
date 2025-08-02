// Get the base URL from your environment variables
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * A centralized fetch wrapper for all API calls.
 * @param {string} endpoint - The API endpoint to call (e.g., '/api/data/trade').
 * @param {object} options - Optional fetch options (method, body, headers).
 * @returns {Promise<any>} - The JSON response from the API.
 */
const apiClient = async (endpoint, options = {}) => {
  const { body, ...customConfig } = options;

  const headers = { 'Content-Type': 'application/json' };

  const config = {
    method: body ? 'POST' : 'GET', // Default to GET, or POST if a body is provided
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: 'An unknown error occurred',
      }));
      throw new Error(errorData.message);
    }

    return response.json();
  } catch (error) {
    console.error('API Client Error:', error);
    throw error;
  }
};

export default apiClient;