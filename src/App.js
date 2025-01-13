import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Make sure Route is imported
import Navbar from './Components/Navbar/Navbar';
import './App.css';
import Landing_Page from './Components/Landing_Page/Landing_Page'; // Correct path and PascalCase

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
            <Route path="/" element={<Landing_Page />} /> {/* Correct usage of Landing_Page component */}
          </Routes>
        </BrowserRouter>
    </div>
  );
}

// Export the App component as the default export
export default App;