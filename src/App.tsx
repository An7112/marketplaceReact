import React from 'react';
import './App.css';
import { BrowserRouter, Routes } from 'react-router-dom';
import Sidebar from 'component/sidebar/sidebar';
import Header from 'component/header/header';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <Sidebar />
      <div className="main">
      <Header />
        <Routes>
        </Routes>
        <div className='footer'></div>
        {/* <Footer /> */}
      </div>
    </div>
  </BrowserRouter>
  );
}

export default App;
