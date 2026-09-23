import axios from 'axios';

// Pointing directly to the FastAPI backend route on port 8000
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
  },
  timeout: 60000,
});

export const predictImage = async (fileOrBlob, filename = 'medical_scan.jpg') => {
  const formData = new FormData();
  formData.append('file', fileOrBlob, filename);
  
  const response = await api.post('/predict', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getScanHistory = async () => {
  const response = await api.get('/history');
  return response.data;
};

export const getScanDetail = async (scanUuid) => {
  const response = await api.get(`/history/${scanUuid}`);
  return response.data;
};

export const checkBackendHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};

export default api;
