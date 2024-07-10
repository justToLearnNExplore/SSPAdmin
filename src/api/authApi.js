import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('user_info')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user_info')).token}`;
  }
  return req;
});

export const login = (formData) => API.post('/login', formData);
export const signInWithGoogle = (accessToken) => API.post('/login', { googleAccessToken: accessToken });
export const signup = (formData) => API.post('/signup', formData);
export const signUpWithGoogle = (accessToken) => API.post('/signup', { googleAccessToken: accessToken });

// Game API calls
export const addGame = (gameData) => API.post('/addgame', gameData);
export const removeGame = (gameId) => API.post('/removegame', { id: gameId });
export const getAllGames = () => API.get('/allgames');

// Image upload API call
export const uploadImages = (formData) => {
  return API.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data' // Important for file uploads
    }
  });
};

//User API
export const getUsers = () => API.get('/users');
export const deleteUser = (userId) => API.delete(`/users/${userId}`);