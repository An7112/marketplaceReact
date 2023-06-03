import React, { useState } from 'react';
import { login } from '.';
import { MdEmail, MdPassword } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import './auth.css'
import { Link } from 'react-router-dom';


const Signup: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(username, password);
            // Điều hướng đến trang bảo vệ sau khi đăng nhập thành công
            // Thay đổi đường dẫn '/protected' bằng đường dẫn mong muốn
            window.location.href = '/protected';
        } catch (error) {
            console.error(error);
            // Xử lý lỗi đăng nhập
        }
    };


    const handleLogout = () => {
        // Xóa access token khỏi lưu trữ (localStorage hoặc session storage)
        localStorage.removeItem('accessToken');
        // Điều hướng người dùng đến trang đăng nhập
        window.location.href = '/login';
    };

    return (
        <div className='form-container'>
            <h3>Signup</h3>
            <p className='text-blur'>Lorem Ipsum is simply dummy.</p>
            <div className='form'>
                <div className='div-label-input'>
                    <label htmlFor="DiplayName">Display name <MdEmail className='icons' /></label>
                    <input className='input' id='DiplayName' type="text" placeholder="Display name" pattern='.{1,}' required
                    />
                </div>
                <div className='div-label-input'>
                    <label htmlFor="Email">Email address <MdEmail className='icons' /></label>
                    <input className='input' id='Email' type="email" placeholder="Email..." pattern='.{1,}' required
                    />
                </div>
                <div className='div-label-input'>
                    <label htmlFor="Password">Password <MdPassword className='icons' /></label>
                    <input className='input' id='Email' type="password" placeholder="Password..." pattern='.{1,}' required
                    />
                </div>
                <button className='login-button'>
                    Sign up
                </button>
                <h5 className='text-blur'>OR</h5>
                <button className='login-button other'>
                    <span className='text-blur'>
                        <FcGoogle /> Continue with Google
                    </span>
                </button>
                <p className='text-row text-blur'>
                    You dont have an account yet?
                    <Link to={'/login'}>
                        <h5>Sign up</h5>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
