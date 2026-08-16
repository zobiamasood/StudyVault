import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('studyvault_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const signup = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axios.get(`${API_BASE_URL}/auth/me`, { headers: getAuthHeaders() });
  return response.data;
};

export const getResources = async () => {
  const response = await axios.get(`${API_BASE_URL}/resources`, { headers: getAuthHeaders() });
  return response.data;
};

export const getResourceById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/resources/${id}`, { headers: getAuthHeaders() });
  return response.data;
};

export const createResource = async (resourceData) => {
  const response = await axios.post(`${API_BASE_URL}/resources`, resourceData, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const updateResource = async (id, resourceData) => {
  const response = await axios.put(`${API_BASE_URL}/resources/${id}`, resourceData, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const deleteResource = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/resources/${id}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};
