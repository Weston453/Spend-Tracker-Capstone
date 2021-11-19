import React, { useState, useEffect } from 'react'

import { initializeApp } from "firebase/app";
import { onAuthStateChanged, getAuth } from '@firebase/auth';
import { getFirestore } from "firebase/firestore";

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import BsFirebaseTest from './components/BsFirebaseTest';
import AddPurchase from './components/AddPurchase';
import MonthBreakDown from './components/MonthBreakDown';


const firebaseConfig = {
  apiKey: "AIzaSyBVrO6EYEWNlLKpu0WLgaCXqj8h-RJ6uIM",
  authDomain: "fir-v9-login.firebaseapp.com",
  projectId: "fir-v9-login",
  storageBucket: "fir-v9-login.appspot.com",
  messagingSenderId: "570177004364",
  appId: "1:570177004364:web:b49a27fa32a66c99d125e9"
};

initializeApp(firebaseConfig);

function App() {
  const [ db, setDb ] = useState(getFirestore());
  const [ user, setUser ] = useState(null)

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, user => {
      setUser(user)
    })
  })

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/Dashboard" element={<Dashboard db={db}/>} />
          <Route path="/BsFirebaseTest" element={<BsFirebaseTest db={db}/>} />
          <Route path="/AddPurchase" element={<AddPurchase />} />
          <Route path="/MonthBreakDown" element={<MonthBreakDown />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
