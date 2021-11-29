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
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

initializeApp(firebaseConfig);

function App() {
  const [ db, setDb ] = useState(getFirestore());
  const [ user, setUser ] = useState(null)
  // const [ currentUserData, setCurrentUserData ] = useState([])

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, user => {
      setUser(user)
    })
    console.log('app')
  })

  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/Dashboard" element={<Dashboard db={db} />} />
          <Route path="/BsFirebaseTest" element={<BsFirebaseTest db={db} />} />
          <Route path="/AddPurchase" element={<AddPurchase db={db} />} />
          <Route path="/MonthBreakDown" element={<MonthBreakDown db={db} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
