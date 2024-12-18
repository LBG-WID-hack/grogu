import React, { useState, useEffect } from 'react';
import './InvestmentOptions.css';
import './portfolio.css';

function InvestmentOptions({ portfolio, setPortfolio, balance, setBalance }) {
  // Initial investments with random price fluctuations
  const initialInvestments = [
    { id: 1, name: 'Tech Stock', basePrice: 500 },
    { id: 2, name: 'Bond', basePrice: 200 },
    { id: 3, name: 'Real Estate', basePrice: 1000 },
    { id: 4, name: 'Microsoft Stock', basePrice: 300 },
  ];

  const [investmentPrices, setInvestmentPrices] = useState(initialInvestments);

  const doSetInitialPrices = () => {
    setInvestmentPrices((prevPrices) =>
      prevPrices.map((investment) => ({
        ...investment,
        price: (
          investment.basePrice + Math.random() * (50) - 25 // Random fluctuation between -25 and 25
        ).toFixed(2),
      }))
    );
  }

  // Simulate random price changes every 5 seconds
  useEffect(() => {
    doSetInitialPrices(); // Do immediately on load

    const interval = setInterval(() => {
      doSetInitialPrices();
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Handle investing
  const handleInvest = (investment) => {
    const investmentPrice = parseFloat(investment.price);
    if (balance >= investmentPrice) {
      setBalance(balance - investmentPrice);

      // Check if the investment already exists in the portfolio
      const existingInvestment = portfolio.find((item) => item.name === investment.name);
      if (existingInvestment) {
        // If exists, increase quantity and average price
        const updatedPortfolio = portfolio.map((item) =>
          item.name === investment.name
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalCost: item.totalCost + investmentPrice,
              }
            : item
        );
        setPortfolio(updatedPortfolio);
      } else {
        // If doesn't exist, add a new investment with 1 quantity
        setPortfolio([
          ...portfolio,
          {
            name: investment.name,
            quantity: 1,
            totalCost: investmentPrice, // Store the total cost of the purchase
            price: investmentPrice,
          },
        ]);
      }
    } else {
      alert('Not enough balance to invest in this option.');
    }
  };

  // Handle selling investment
  const handleSell = (investmentName, quantityToSell, currentPrice) => {
    const investmentToSell = portfolio.find((item) => item.name === investmentName);
    if (investmentToSell && investmentToSell.quantity >= quantityToSell) {
      const saleValue = quantityToSell * currentPrice;
      const updatedPortfolio = portfolio.map((item) =>
        item.name === investmentName
          ? {
              ...item,
              quantity: item.quantity - quantityToSell,
              totalCost: item.totalCost - quantityToSell * item.price, // Subtract the cost of sold shares
            }
          : item
      ).filter((item) => item.quantity > 0); // Remove items with quantity 
      setPortfolio(updatedPortfolio);
      setBalance(balance + saleValue); // Add the sale value to balance
      

    } else {
      alert('Not enough shares to sell.');
    }
  };

  return (
    <div className="">
      <h2 className="p-5">Based on your interests, here is what you might want to invest in</h2>

      <div className="investmentCardWrapper">
        {investmentPrices.map((investment) => (
          <div className="investmentCard" key={investment.id}>
            <div className="inner">
              <div className="InvestmentName">
                <h4>{investment.name}</h4>
              </div>
              <p className="left">Risk: Medium</p>
              <p className="left">Example investment option for {investment.name}.</p>
              <button className="buyInvestment widowsRed" onClick={() => handleInvest(investment)}>
                Buy @ £{investment.price}
              </button>
              <button 
                className='sellInvestment' onClick={() => {
                const quantityToSell = prompt('How many shares do you want to sell?', 1);
                if (quantityToSell && quantityToSell > 0) {
                  handleSell(investment.name, parseInt(quantityToSell), parseFloat(investment.price));
                  }
                }} >
                  Sell
                </button>
            </div>
          </div>
        ))}
      </div>

      <div className="portfolio">
        <h2>Your Portfolio</h2>
        <div className="investmentGrid">
          {portfolio.length === 0 ? (
            <p>No investments yet. Start investing!</p>
          ) : (
            portfolio.map((investment, index) => (
              <div className="investmentItem" key={index}>
                <div className="fl-left">
                  <p className="name left bold mt-2 mb-2">{investment.name}</p>
                  <p className="name left mt-2 mb-2">
                    <b>{investment.quantity}</b> shares (Average buy price: £{(investment.totalCost / investment.quantity).toFixed(2)})
                  </p>
                  <p className="name left mt-2 mb-2">Current price: £{investment.price}</p>
                </div>

                <div className="fl-left">
                  <button
                    onClick={() => {
                      const quantityToSell = prompt('How many shares do you want to sell?', 1);
                      if (quantityToSell && quantityToSell > 0) {
                        handleSell(investment.name, parseInt(quantityToSell), parseFloat(investment.price));
                      }
                    }}
                  >
                    Sell
                  </button>
                </div>
              </div>
            ))
          )}
          </div>
      </div>
    </div>
  );
}

export default InvestmentOptions;
