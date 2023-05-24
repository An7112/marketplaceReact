import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from 'component/sidebar/sidebar';
import Header from 'component/header/header';
import './App.css';
import { useSelector } from 'react-redux';
import LoginWithGoogle from 'component/login/LoginWithGoogle';

function App() {
  const { user } = useSelector((state: any) => state.auth);
return (
  <BrowserRouter>
    <div className="container">
      <Sidebar />
      <div className="main" >
        <Header />
        <Routes>
          <Route path='/' element={<Navigate to='/overview' />} />
          <Route path='/overview' element={<LoginWithGoogle />} />
        </Routes>
        <div className='footer'></div>
        {/* <Footer /> */}
      </div>
    </div>
  </BrowserRouter>
);
}

export default App;
