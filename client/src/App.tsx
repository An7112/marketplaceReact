import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from 'component/sidebar/sidebar';
import Header from 'component/header/header';
import './App.css';
import Collection from 'pages/overview/collection';
import Profile from 'pages/profile/profile';
import CreateItem from 'pages/create/create-item';
import StoreDetails from 'pages/store-details/storeDetails';
import Product from 'pages/product/product';
import { OrderHistory } from 'pages/history/history';

function App() {
return (
  <BrowserRouter>
    <div className="container">
      <Sidebar />
      <div className="main" >
        <Header />
        <Routes>
          <Route path='/' element={<Navigate to='/collection' />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/create' element={<CreateItem />} />
          <Route path='/store/:storeId' element={<StoreDetails />} />
          <Route path='/product/:storeId/:productId' element={<Product />} />
          <Route path='/history' element={<OrderHistory />} />
        </Routes>
        <div className='footer'></div>
        {/* <Footer /> */}
      </div>
    </div>
  </BrowserRouter>
);
}

export default App;
