import axios from 'axios';

// Get base URL from environment or fallback to local backend on port 8000
const RAW_API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Ensure no trailing slashes on base URL to prevent double slashes (e.g., '//predict')
export const API_BASE_URL = (RAW_API_BASE_URL || '').trim().replace(/\/+$/, '');

// Robust URL helper ensuring a single clean slash between host and endpoint
export const formatEndpointUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000,
  headers: {
    'Accept': 'application/json',
  },
});

export const predictImage = async (fileOrBlob, filename = 'medical_scan.jpg') => {
  const formData = new FormData();
  formData.append('file', fileOrBlob, filename);
  
  // Format clean endpoint URL without double slashes
  const targetUrl = formatEndpointUrl('/predict');
  
  // Do NOT explicitly set 'Content-Type': 'multipart/form-data',
  // allowing axios/browser to automatically append the multipart boundary parameter
  const response = await api.post(targetUrl, formData);
  return response.data;
};

export const getScanHistory = async () => {
  const targetUrl = formatEndpointUrl('/history');
  const response = await api.get(targetUrl);
  return response.data;
};

export const getScanDetail = async (scanUuid) => {
  const targetUrl = formatEndpointUrl(`/history/${scanUuid}`);
  const response = await api.get(targetUrl);
  return response.data;
};

export const checkBackendHealth = async () => {
  const targetUrl = formatEndpointUrl('/health');
  const response = await api.get(targetUrl);
  return response.data;
};

export default api;
