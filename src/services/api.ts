import axios from 'axios';

const api = axios.create({
  // Lembre-se: Use 'http://10.0.2.2:8000' para o Emulador Android 
  // ou o IP da sua máquina se estiver a testar num telemóvel físico
  baseURL: 'http://10.0.2.2:8000', 
});

export default api;

export const API_URL = "http://10.0.2.2:8000";