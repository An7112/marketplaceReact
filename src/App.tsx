import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from 'component/sidebar/sidebar';
import Header from 'component/header/header';
import './App.css';
import { useSelector } from 'react-redux';
import LoginWithGoogle from 'component/login/LoginWithGoogle';

function App() {
  const { user } = useSelector((state: any) => state.auth);
  console.log(user);
  return (
    <BrowserRouter>
      <div className="container">
        {user && <Sidebar />}
        <div className="main" style={{width: !user ? '100%' : ''}}>
          {user && <Header />}
          <Routes>
            <Route path='/' element={<Navigate to={user ? '/overview' : 'login'} />} />
            <Route path='/overview' element={<LoginWithGoogle />} />
            <Route path='/login' element={<LoginWithGoogle />} />
          </Routes>
          <div className='footer'></div>
          {/* <Footer /> */}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
