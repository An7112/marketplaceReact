import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { refreshAccessToken } from '.';

const withAuth = (WrappedComponent: React.FC) => {
  const ComponentWithAuth: React.FC = () => {
    const history = useNavigate();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          await refreshAccessToken();
        } catch (error) {
          console.error(error);
          // Xử lý lỗi lấy access token mới
          history('/login'); // Điều hướng đến trang đăng nhập nếu access token không hợp lệ
        }
      };

      checkAuth();
    }, []);

    return <WrappedComponent />;
  };

  return ComponentWithAuth;
};
