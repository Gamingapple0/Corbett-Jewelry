import logo from './logo.svg';
import './App.css';
import React from 'react';


import Navbar from './components/Navbar';
// import Home from './components/Home'
import Signup from './components/Signup';
import Signin from './components/Signin';

import { auth } from './config/firebase'

import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route,
    useLocation,
    Router
  } from "react-router-dom";




function App() {
  var [location, setLocation] = React.useState('');
  // var [signedIn, setSignedIn] = React.useState(false);

  const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={location != '/' && <Navbar location={location}/>}>
            <Route index element={<Signin setLocation={setLocation}/>}></Route>
            <Route path="/signup" element={<Signup setLocation={setLocation}></Signup>}></Route>
            <Route path="/signin" element={<Signin setLocation={setLocation}></Signin>}></Route>
            <Route path="*" element={<Signin setLocation={setLocation}/>} />
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
