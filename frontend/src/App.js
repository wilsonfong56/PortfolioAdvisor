import React, { useState } from 'react';
import Portfolio from "./components/Portfolio.js";
import ChatInterface from "./components/ChatInterface.js";
import './index.css';
import {useNavigate} from "react-router-dom";

function App() {
    const [portfolio, setPortfolio] = useState([]);
    const [currentPrices, setCurrentPrices] = useState({});
    const navigate = useNavigate();

    const handleLogout = () => {
        //logout logic
        navigate('/');
    }

    return (
      <div className="flex justify-center items-center min-h-screen">
          <button
              className="absolute top-4 right-4 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              onClick={handleLogout}
          >
              Logout
          </button>
          <div className="flex flex-col lg:flex-row gap-6 max-w-7xl w-full">
              <div className="lg:flex-[2]">
                  <Portfolio
                      portfolio={portfolio}
                      setPortfolio={setPortfolio}
                      currentPrices={currentPrices}
                      setCurrentPrices={setCurrentPrices}
                  />
              </div>
              <div className="lg:flex-[1] pt-6">
                  <ChatInterface
                      portfolio={portfolio}
                      currentPrices={currentPrices}
                  />
              </div>
          </div>
      </div>
  );
}


export default App;
