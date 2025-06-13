import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshResponse = await refreshToken();
        localStorage.setItem('token', refreshResponse.token);
        originalRequest.headers.Authorization = `Bearer ${refreshResponse.token}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('token');
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth API calls
export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const refreshToken = async () => {
  const response = await api.post('/auth/refresh-token');
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await api.post('/auth/forgot-password', { email });
  return response.data;
};

// Jobs API calls
export const getJobs = async (params = {}) => {
  const response = await api.get('/jobs', { params });
  return response.data;
};

export const getJobById = async (id) => {
  const response = await api.get(`/jobs/${id}`);
  return response.data;
};

export const createJob = async (jobData) => {
  const response = await api.post('/jobs', jobData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateJob = async (id, jobData) => {
  const response = await api.put(`/jobs/${id}`, jobData);
  return response.data;
};

export const deleteJob = async (id) => {
  const response = await api.delete(`/jobs/${id}`);
  return response.data;
};

// Proposals API calls
export const createProposal = async (jobId, proposalData) => {
  const response = await api.post(`/jobs/${jobId}/proposals`, proposalData);
  return response.data;
};

export const getMyProposals = async () => {
  const response = await api.get('/proposals/sent');
  return response.data;
};

export const getReceivedProposals = async () => {
  const response = await api.get('/proposals/received');
  return response.data;
};

export default api;
