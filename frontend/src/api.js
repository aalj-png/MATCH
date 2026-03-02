const API_BASE_URL = 'http://localhost:8000/api';

export const apiCall = async (method, endpoint, data = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (data && (method === 'POST' || method === 'PUT')) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.detail || `API error: ${response.status}`);
    }

    return responseData;
  } catch (error) {
    throw error;
  }
};

// Auth API calls
export const authAPI = {
  register: (userData) => apiCall('POST', '/auth/register', userData),
  login: (email, password) => apiCall('POST', '/auth/login', { email, password }),
  getMe: (token) => apiCall('GET', '/auth/me', null, token),
};

// Matches API calls
export const matchesAPI = {
  getAll: (skip = 0, limit = 10, status = null) => {
    let url = `/matches?skip=${skip}&limit=${limit}`;
    if (status) url += `&status=${status}`;
    return apiCall('GET', url);
  },
  getById: (id) => apiCall('GET', `/matches/${id}`),
  create: (matchData, token) => apiCall('POST', '/matches', matchData, token),
  update: (id, matchData, token) => apiCall('PUT', `/matches/${id}`, matchData, token),
  delete: (id, token) => apiCall('DELETE', `/matches/${id}`, null, token),
  getUserMatches: (userId, skip = 0, limit = 10) => 
    apiCall('GET', `/matches/user/${userId}?skip=${skip}&limit=${limit}`),
};
