import React, { useState, useEffect } from 'react';

function InvestmentOptions({ portfolio, setPortfolio, balance, setBalance }) {
  // Initial investments with random price fluctuations
  const initialInvestments = [
    { id: 1, name: 'Tech Stock', basePrice: 500 },
    { id: 2, name: 'Bond', basePrice: 200 },
    { id: 3, name: 'Real Estate', basePrice: 1000 },
    { id: 4, name: 'Microsoft Stock', basePrice: 300 },
  ];

  const [investmentPrices, setInvestmentPrices] = useState(initialInvestments);

  // Simulate random price changes every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setInvestmentPrices((prevPrices) =>
        prevPrices.map((investment) => ({
          ...investment,
          price: (
            investment.basePrice + Math.random() * (50) - 25 // Random fluctuation between -25 and 25
          ).toFixed(2),
        }))
      );
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
      );
      setPortfolio(updatedPortfolio);
      setBalance(balance + saleValue); // Add the sale value to balance
    } else {
      alert('Not enough shares to sell.');
    }
  };

  return (
    <div>
      <h2>Choose Your Investment</h2>
      {investmentPrices.map((investment) => (
        <div key={investment.id}>
          <button onClick={() => handleInvest(investment)}>
            Invest in {investment.name} (£{investment.price})
          </button>
          <p>Risk: Medium</p>
          <p>Info: Example investment option for {investment.name}.</p>
        </div>
      ))}

      <h2>Your Portfolio</h2>
      {portfolio.length === 0 ? (
        <p>No investments yet. Start investing!</p>
      ) : (
        portfolio.map((investment, index) => (
          <div key={index}>
            <p>
              {investment.name}: {investment.quantity} shares (Average buy price: £{(investment.totalCost / investment.quantity).toFixed(2)})
            </p>
            <p>Current price: £{investment.price}</p>
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
        ))
      )}
    </div>
  );
}

export default InvestmentOptions;
