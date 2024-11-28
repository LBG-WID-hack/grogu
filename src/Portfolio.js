import React from 'react';

function Portfolio({ portfolio, balance }) {
  return (
    <div>
      <h2>Your Portfolio</h2>
      <p>Balance: £{balance.toFixed(2)}</p>
      <ul>
        {portfolio.length === 0 ? (
          <p>No investments yet. Start investing!</p>
        ) : (
          portfolio.map((investment, index) => (
            <li key={index}>
              {investment.name}: {investment.quantity} shares (Average buy price: £{(investment.totalCost / investment.quantity).toFixed(2)})
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Portfolio;
