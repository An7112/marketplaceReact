import axios from 'axios';

const API_URL = 'https://marketplace-3lqw.onrender.com/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const login = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post('/login', { username, password });
    const { accessToken, refreshToken, userId } = response.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userId', userId);
    return response.data;
  } catch (error) {
    throw new Error('Đăng nhập không thành công');
  }
};

export const signup = async (displayName: string, username: string, password: string) => {
  try {
    const response = await axiosInstance.post('/register', { username, password, displayName });
    return response.data;
  } catch (error) {
    throw new Error('Đăng ký không thành công');
  }
};


export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    console.error('Lỗi khi làm mới token')
  }
  try {
    const response = await axiosInstance.post('/token', { refreshToken });
    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  } catch (error) {
    console.error('Lỗi khi làm mới token')
  }
};
