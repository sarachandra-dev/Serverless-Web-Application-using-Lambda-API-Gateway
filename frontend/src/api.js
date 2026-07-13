import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'https://ejvpd14oth.execute-api.us-east-1.amazonaws.com/api' });

export const shareText = (text) => api.post('/share', { text });
export const retrieveText = (code) => api.get(`/retrieve/${code}`);
