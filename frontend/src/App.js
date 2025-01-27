import React, { useState } from 'react';
import Portfolio from "./components/Portfolio.js";
import ChatInterface from "./components/ChatInterface.js";
import './index.css';
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import AppHeader from "./components/AppHeader.js";

function App() {
    const [portfolio, setPortfolio] = useState([]);
    const [currentPrices, setCurrentPrices] = useState({});
    const navigate = useNavigate();

    // if (!Cookies.get('email')) {
    //     navigate('/');
    // }

    return (
        <>
            <AppHeader/>
            <div className="flex justify-center items-center min-h-screen">
                  <div className="flex flex-col lg:flex-row gap-6 max-w-9xl w-full">
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
        </>
    );
}


export default App;
