import React, { useState } from 'react';
import Portfolio from './Portfolio';
import InvestmentOptions from './InvestmentOptions';
import MarketNews from './MarketNews';
import LoginPage from './Login';
import './App.css';

function App() {
  const [portfolio, setPortfolio] = useState([]);
  const [balance, setBalance] = useState(10000); // Initial balance
  const [showInvestmentTips, setShowInvestmentTips] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  }

  return (
    <div className="App">
      {!isLoggedIn ? (
        <div>
        <LoginPage onLogin={handleLogin} />
        {console.log(isLoggedIn)}
        </div>
        
      ): (
      <div>
        <h1>Investment Game: Empowering Young Women</h1>
      
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
      <div className="header">
        <h1>Investment Game</h1>
        <h2>Empowering Young Women</h2>
      </div>

      {/* Toggle Button */}
      {!showInvestmentTips && (
        <button onClick={() => setShowInvestmentTips(true)} className="toggleButton">
          Show Investment Tips
        </button>
      )}

      {/* Display investment tips */}
      {showInvestmentTips && (
        <div className="investmentTips">
          <div className="title">
            <h2>Investment Tips</h2>
            <h2 className="right" onClick={() => setShowInvestmentTips(false)} style={{ cursor: 'pointer' }}>
              X
            </h2>
          </div>
          <div className="left">
            <p>Start investing early to benefit from compounding returns.</p>
            <p>Diversify your investments to reduce risk.</p>
            <p>Understand the risk and reward for each investment option.</p>
            <p>Stay informed about market trends and news.</p>
          </div>
        </div>
      )}

      {/* Values */}
      <div className="valuesWrapper">
        <div className="values investmentValue">
          <div className="title">
            <h3>Investments: </h3>
          </div>
          <div className="balance">
            <p>
              £
              <span>
                {portfolio.reduce((acc, curr) => acc + curr.totalCost, 0).toFixed(2)}
              </span>
            </p>
          </div>
        </div>
        <div className="values portfolioValue">
          <div className="title">
            <h3>Portfolio: </h3>
          </div>
          <div className="balance">
            <p>£<span>{balance.toFixed(2)}</span></p>
          </div>
        </div>
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
      )}
    </div>
  );
}

export default App;
