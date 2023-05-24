import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithGoogle, logoutUser } from 'store/actions/auth';
import { MdEmail, MdPassword } from 'react-icons/md'
import {FcGoogle} from 'react-icons/fc'
import './login.css'

const LoginWithGoogle: React.FC = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state: any) => state.auth);

  const handleLoginWithGoogle = () => {
    dispatch(loginWithGoogle() as any);
  };

  const handleLogout = () => {
    dispatch(logoutUser() as any);
  };

  return (
    <div className='login-main'>
      <h3>Login</h3>
      <p className='text-blur'>Lorem Ipsum is simply dummy.</p>
      <div className='form'>
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
          Login
        </button>
        <h5 className='text-blur'>OR</h5>
        <button className='login-button other'>
          <span className='text-blur' onClick={handleLoginWithGoogle}>
            <FcGoogle/> Continue with Google
          </span>
        </button>
        <p className='text-row text-blur'>You dont have an account yet?<h5>Sign up</h5></p>
      </div>
    </div>
  );
};

export default LoginWithGoogle;
