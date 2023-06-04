import React, { useState } from 'react';
import { signup } from '.';
import { MdEmail, MdPassword } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import './auth.css'
import { Link } from 'react-router-dom';


const Signup: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signup(displayName, username, password);
            window.location.href = '/login';
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='container'>
            <div className='main'>
                <div className='form-container'>
                    <h3>Signup</h3>
                    <p className='text-blur'>Lorem Ipsum is simply dummy.</p>
                    <div className='form'>
                        <div className='div-label-input'>
                            <label htmlFor="DiplayName">Display name <MdEmail className='icons' /></label>
                            <input className='input' id='DiplayName' type="text" placeholder="Display name" pattern='.{1,}' required
                                onChange={(event) => setDisplayName(event.target.value)}
                            />
                        </div>
                        <div className='div-label-input'>
                            <label htmlFor="Email">Email address <MdEmail className='icons' /></label>
                            <input className='input' id='Email' type="email" placeholder="Email..." pattern='.{1,}' required
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className='div-label-input'>
                            <label htmlFor="Password">Password <MdPassword className='icons' /></label>
                            <input className='input' id='Email' type="password" placeholder="Password..." pattern='.{1,}' required
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <button className='login-button' onClick={handleSignup}>
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
            </div>
        </div>
    );
};

export default Signup;
