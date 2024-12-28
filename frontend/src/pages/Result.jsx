import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Hotels from '../components/hotels/Hotels';
import Attractions from '../components/attractions/Attractions';
import Restaurants from '../components/restaurants/Restaurants';
import './Result.css'; // Import the CSS file for custom styles
import Cookies from 'js-cookie'; // Import js-cookie to handle cookies

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');

  const [activeTab, setActiveTab] = useState('hotels');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication status

  useEffect(() => {
    // Check if the user has a valid authentication token
    const token = Cookies.get('token'); // Read token from cookies
    if (!token) {
      // If no token is found, redirect to login page
      navigate('/');
      alert("You are not log in");
    } else {
      setIsAuthenticated(true); // If token exists, set authenticated state to true
    }
  }, [navigate]);

  if (!query) {
    return (
      <div>
        <h1>No query provided</h1>
        <p>Please provide a valid query parameter in the URL.</p>
      </div>
    );
  }

  const goback = () => {
    navigate('/');
  };

  return (
    <div className="result-container">
      <header className="header">
        <h1 className="website-name">Travelify</h1>
      </header>
      <button className="go-back-btn" onClick={goback}>
        <span className="go-back-symbol">&#8592;</span> Go Back
      </button>
      <h2 className="query-heading"> {query}</h2>

      {/* Buttons to switch between tabs */}
      <div className="tab-buttons">
        <button 
          className={`tab-btn ${activeTab === 'hotels' ? 'active' : ''}`}
          onClick={() => setActiveTab('hotels')}
        >
          Hotels
        </button>
        <button 
          className={`tab-btn ${activeTab === 'restaurants' ? 'active' : ''}`}
          onClick={() => setActiveTab('restaurants')}
        >
          Restaurants
        </button>
        <button 
          className={`tab-btn ${activeTab === 'attractions' ? 'active' : ''}`}
          onClick={() => setActiveTab('attractions')}
        >
          Attractions
        </button>
      </div>

      {/* Content displayed based on the active tab */}
      <div>
        {activeTab === 'hotels' && <Hotels query={query} />}
        {activeTab === 'restaurants' && <Restaurants query={query} />}
        {activeTab === 'attractions' && <Attractions query={query} />}
      </div>
    </div>
  );
}
