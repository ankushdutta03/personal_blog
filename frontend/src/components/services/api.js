import axios from 'axios';

const API = axios.create({
  baseURL: 'https://personal-blog-backend-yuwu.onrender.com/api',
  withCredentials: true, // optional, only if using cookies/sessions
});

export default API;
