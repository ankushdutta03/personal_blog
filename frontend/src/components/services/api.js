import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // ✅ Make sure port matches your backend
  withCredentials: true, // optional, only if using cookies/sessions
});

export default API;
