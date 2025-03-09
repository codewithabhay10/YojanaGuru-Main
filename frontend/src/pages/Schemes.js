import React, { useState, useEffect } from "react";
import API from "../api/api"; // Axios instance for API calls
import SchemeCard from "../components/SchemeCard"; // Scheme card component
import Chatbot from "../components/Chatbot"; // Import the Chatbot component
import "./Schemes.css"; // Import CSS for styling

const Schemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [filters, setFilters] = useState({
    age: "",
    income: "",
    location: "",
    occupation: "",
    gender: "Any",
  });

  useEffect(() => {
    fetchAllSchemes(); // Fetch all schemes on page load
  }, []);

  const fetchAllSchemes = async () => {
    try {
      const { data } = await API.get("/schemes"); // Fetch all schemes
      setSchemes(data);
    } catch (error) {
      console.error("Error fetching schemes:", error);
    }
  };

  const applyFilters = async () => {
    try {
      const isFilterApplied = Object.values(filters).some(
        (value) => value !== "" && value !== "Any"
      );

      if (!isFilterApplied) {
        fetchAllSchemes();
      } else {
        const { data } = await API.post("/schemes/recommend", filters);
        setSchemes(data); // Update schemes based on filters
      }
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  const handleInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Filters Section */}
        <div className="col-md-3">
          <div className="filters-container">
            <h4>Filters</h4>
            <form className="mb-4">
              <div className="mb-3">
                <label htmlFor="age" className="form-label">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  className="form-control"
                  value={filters.age}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="income" className="form-label">
                  Income
                </label>
                <select
                  id="income"
                  name="income"
                  className="form-select"
                  value={filters.income}
                  onChange={handleInputChange}
                >
                  <option value="">Select Income</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="location" className="form-label">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="form-control"
                  value={filters.location}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="occupation" className="form-label">
                  Occupation
                </label>
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  className="form-control"
                  value={filters.occupation}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="form-select"
                  value={filters.gender}
                  onChange={handleInputChange}
                >
                  <option value="Any">Any</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={applyFilters}
              >
                Apply Filters
              </button>
            </form>
          </div>
        </div>

        {/* Schemes Section */}
        <div className="col-md-9">
          <h4>Available Schemes</h4>
          <div className="row">
            {schemes.length > 0 ? (
              schemes.map((scheme) => (
                <SchemeCard key={scheme.schemeId} scheme={scheme} />
              ))
            ) : (
              <p>No schemes available.</p>
            )}
          </div>

          
      {/* Floating Chatbot Button */}
      <button className="chatbot-toggle-btn" onClick={toggleChatbot}>
        💬
      </button>

          {/* Chatbot Popup */}
          {showChatbot && (
            <div className="chatbot-popup">
              <button className="close-btn" onClick={toggleChatbot}>
                &times;
              </button>
              <Chatbot />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Schemes;
