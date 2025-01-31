import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/Landing_Page/LandingPage';  // Ensure this import is correct
import Login from "./Components/Login/Login";
import SignUp from "./Components/Sign_Up/Sign_Up";
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';

function App() {
  useEffect(() => {
    console.log('App component mounted');
  }, []);  

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />  {/* Corrected component name */}
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/InstantConsultation" element={<InstantConsultation/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;