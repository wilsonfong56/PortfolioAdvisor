import React, { useState } from 'react';
import Portfolio from "./components/Portfolio";
import ChatInterface from "./components/ChatInterface";
import './index.css';

function App() {
    const [portfolio, setPortfolio] = useState([]);
    const [currentPrices, setCurrentPrices] = useState({});

    return (
      <div className="max-w-6xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Portfolio
                  portfolio={portfolio}
                  setPortfolio={setPortfolio}
                  currentPrices={currentPrices}
                  setCurrentPrices={setCurrentPrices}
              />
              <ChatInterface
                  portfolio={portfolio}
                  currentPrices={currentPrices}
              />
          </div>
      </div>
  );
}


export default App;
