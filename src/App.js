import React, { useState } from 'react';
import Portfolio from './Portfolio';
import InvestmentOptions from './InvestmentOptions';
import MarketNews from './MarketNews';
import './App.css'

function App() {
  const [portfolio, setPortfolio] = useState([]);
  const [balance, setBalance] = useState(10000);  // Initial balance

  return (
    <div className="App">
      <div className="header">
        <h1>Investment Game</h1>
        <h2>Empowering Young Women</h2>
      </div>
      
      {/* Display investment tips */}
      <div>
        <h2>Investment Tips</h2>
        <p>Start investing early to benefit from compounding returns.</p>
        <p>Diversify your investments to reduce risk.</p>
        <p>Understand the risk and reward for each investment option.</p>
        <p>Stay informed about market trends and news.</p>
      </div>

      {/* Display total invested amount */}
      <div>
        <h2>Total Amount Invested: £{portfolio.reduce((acc, curr) => acc + (curr.totalCost), 0).toFixed(2)}</h2>
      </div>

      {/* Display balance */}
      <div>
        <p>Balance: £{balance.toFixed(2)}</p>
      </div>

      {/* Portfolio and Investment Options */}
      <Portfolio portfolio={portfolio} balance={balance} />
      <InvestmentOptions
        portfolio={portfolio}
        setPortfolio={setPortfolio}
        balance={balance}
        setBalance={setBalance}
      />
      <MarketNews />
    </div>
  );
}

export default App;
