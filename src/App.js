import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/Landing_Page/LandingPage';

function App() {
  return (
    <div className="App">
        {/* Set up BrowserRouter for routing */}
        <BrowserRouter>
          {/* Display the Navbar component */}
          <Navbar />
          {/* Set up the Routes for different pages */}
          <Routes>
            {/* Define Route for the landing page */}
            <Route path="/" element={<LandingPage />} /> {/* Correct usage of LandingPage component */}
          </Routes>
        </BrowserRouter>
    </div>
  );
}

// Export the App component as the default export
export default App;