import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Thay đổi URL của API server nếu cần

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const login = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post('/login', { username, password });
    const { accessToken, refreshToken } = response.data;
    // Lưu trữ access token và refresh token vào localStorage hoặc sessionStorage
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return response.data;
  } catch (error) {
    throw new Error('Đăng nhập không thành công');
  }
};

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error('Token refresh không tồn tại');
  }
  try {
    const response = await axiosInstance.post('/token', { refreshToken });
    const { accessToken } = response.data;
    // Lưu trữ access token mới vào localStorage hoặc sessionStorage
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  } catch (error) {
    throw new Error('Lấy access token mới không thành công');
  }
};
