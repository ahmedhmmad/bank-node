import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard'; 

const App = () => {
  const [redirectUrl, setRedirectUrl] = useState(null);

  useEffect(() => {
    // Check if there's a redirect URL in the response
    if (redirectUrl) {
      // Redirect the user
      <Navigate to={redirectUrl} />;
    }
  }, [redirectUrl]);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Login setRedirectUrl={setRedirectUrl} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
