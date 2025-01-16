import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/Landing_Page/LandingPage';  // Updated import

function App() {
  useEffect(() => {
    // Code to run when the component mounts
    console.log('App component mounted');
  }, []);  // Empty array ensures this only runs once after the initial render

  return (
    <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;