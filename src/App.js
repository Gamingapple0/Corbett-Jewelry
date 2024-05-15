import logo from './logo.svg';
import './App.css';
import React from 'react';


import Navbar from './components/Navbar';
import Home from './components/Home'
import Signup from './components/Signup';
import Signin from './components/Signin';
import Payment from './components/Payment';
import Shipping from './components/Shipping';
import Success from './components/Success';

import { auth } from './config/firebase'

import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route,
    useLocation,
    Router,
    createHashRouter
  } from "react-router-dom";




function App() {
  var [location, setLocation] = React.useState('');
  var [paymentProcessing, setPaymentProcessing] = React.useState(false);
  // var [signedIn, setSignedIn] = React.useState(false);

  const router = createHashRouter(
    createRoutesFromElements(
        <Route path="/" element={location != '/' && <Navbar/>}>
            <Route index element={<Signin setLocation={setLocation}/>}></Route>
            <Route path="/signup" element={<Signup></Signup>}></Route>
            <Route path="/signin" element={<Signin></Signin>}></Route>
            <Route path="/products" element={<Home></Home>}></Route>
            <Route path="/shipping" element={<Shipping></Shipping>}></Route>
            <Route path="/payment" element={<Payment></Payment>}></Route>
            <Route path="/sucess" element={<Success></Success>}></Route>
            <Route path="/failed" element={<Home></Home>}></Route>
            <Route path="*" element={<Signin/>} />
            {/* <Route path="/corbett-jewelry" element={<Home setLocation={setLocation}/>} /> */}
        </Route>
    )
  )

  return (
      <RouterProvider router={router}>
      </RouterProvider>
  )
}

export default App;
