import React, { useState, useEffect } from 'react'
import { initializeApp } from "firebase/app";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import { onAuthStateChanged, getAuth } from '@firebase/auth';
import ForgotPassword from './components/ForgotPassword';

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
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
