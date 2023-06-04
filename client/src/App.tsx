import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Collection from 'pages/overview/collection';
import Profile from 'pages/profile/profile';
import CreateItem from 'pages/create/create-item';
import StoreDetails from 'pages/store-details/storeDetails';
import Product from 'pages/product/product';
import { OrderHistory } from 'pages/history/history';
import Login from 'pages/auth/login';
import Signup from 'pages/auth/signup';
function App() {

  return (
    <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navigate to='/collection' />} />
            <Route path='/signup' element={<Signup />} />
            <Route path={'/login'} element={<Login />} />
            <Route path='/collection' element={<Collection />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/create' element={<CreateItem />} />
            <Route path='/store/:storeId' element={<StoreDetails />} />
            <Route path='/product/:storeId/:productId' element={<Product />} />
            <Route path='/history' element={<OrderHistory />} />
          </Routes>
          <div className='footer'></div>
    </BrowserRouter>
  );
}

export default App;
