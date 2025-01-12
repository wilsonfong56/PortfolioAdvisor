import React, { useState } from 'react';
import Portfolio from "./components/Portfolio";
import ChatInterface from "./components/ChatInterface";
import './index.css';

function App() {
    const [portfolio, setPortfolio] = useState([
        { symbol: 'AAPL', shares: '10', price: '180.50' },
        { symbol: 'GOOGL', shares: '5', price: '140.25' }
    ]);

  return (
      <div className="max-w-6xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Portfolio
                  portfolio={portfolio}
                  setPortfolio={setPortfolio}
              />
              <ChatInterface portfolio={portfolio}/>
          </div>
      </div>
  );
}


export default App;
