import axios from 'axios';

const api = axios.create({
  baseURL: '/',
  headers: {
    'Accept': 'application/json',
  },
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
