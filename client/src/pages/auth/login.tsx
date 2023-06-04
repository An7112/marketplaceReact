import React, { useEffect, useState } from 'react';
import { login } from '.';
import { MdEmail, MdPassword } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import './auth.css'
import { Link } from 'react-router-dom';
import { Messages } from 'modal/index';
import { ToastMessage } from 'component/toast-message';
import QueryLoading from 'component/query-loading/query-loading';


const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<Messages>({ title: null, status: null, description: null });
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      await login(username, password);
      window.location.href = '/collection';
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage({
          title: error.message,
          description: error.message,
          status: false
        })
        setVisible(true);
      }
    }finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      window.location.href = "/collection"
    }
  }, []);

  return (
    <div className='container'>
      {visible === true ? <ToastMessage
        {...message}
      /> : ''}
        {isLoading === true && <QueryLoading />}
      <div className='main'>
        <div className='form-container'>
          <h3>Login</h3>
          <p className='text-blur'>Lorem Ipsum is simply dummy.</p>
          <div className='form'>
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
            <button className='login-button' onClick={handleLogin}>
              Login
            </button>
            <h5 className='text-blur'>OR</h5>
            <button className='login-button other'>
              <span className='text-blur'>
                <FcGoogle /> Continue with Google
              </span>
            </button>
            <p className='text-row text-blur'>
              You dont have an account yet?
              <Link to={'/signup'}>
                <h5>Sign up</h5>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
