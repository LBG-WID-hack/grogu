
import React, { useState, useEffect } from 'react';
import './InvestmentOptions.css';
import './portfolio.css';

function InvestmentOptions({ portfolio, setPortfolio, balance, setBalance }) {
  // Categorized investments with companies and their prices
  const initialInvestments = [
    { id: 1, name: 'Vera Bradley (VRA)', price: 13.50 },
    { id: 2, name: 'Eventbrite (EB)', price: 13.15 },
    { id: 3, name: 'The RealReal (REAL)', price: 6.55 },
    { id: 4, name: 'Etsy (ETSY)', price: 94.72 },
    { id: 5, name: 'Bumble (BMBL)', price: 13.09 },
    { id: 6, name: 'Rumble (RUM)', price: 10.82 },
    { id: 7, name: 'GoDaddy (GDDY)', price: 72.50 },
    { id: 8, name: 'Under Armour (UA)', price: 9.25 },
    { id: 9, name: 'Airbnb (ABNB)', price: 131.15 },
    { id: 10, name: 'CarGurus (CARG)', price: 22.14 },
    { id: 11, name: 'Nvidia (NVDA)', price: 480.40 },
    { id: 12, name: 'Zoetis (ZTS)', price: 174.82 },
    { id: 13, name: 'Sage Therapeutics (SAGE)', price: 38.65 },
    { id: 14, name: 'Illumina (ILMN)', price: 232.15 },
    { id: 15, name: 'Seagen (SGEN)', price: 215.12 },
    { id: 16, name: 'Barnes & Noble (BKS)', price: 7.99 },
    { id: 17, name: 'Books-A-Million (BAMM)', price: 1.23 },
    { id: 18, name: 'Sunrun (RUN)', price: 20.20 },
    { id: 19, name: 'Lendlease (LLC)', price: 12.90 },
    { id: 20, name: 'Petco Health and Wellness (WOOF)', price: 20.75 },
    { id: 21, name: 'Amplify Snack Brands', price: 22.52 },
    { id: 22, name: 'Tiqets', price: 20.00 },
    { id: 23, name: 'Mars Petcare', price: 175.00 },
    { id: 24, name: 'Clorox (CLX)', price: 157.82 },
    { id: 25, name: 'Women for Women International', price: 10.00 },
    { id: 26, name: 'Hello Sunshine', price: 1000.00 },
    { id: 27, name: 'Shonda Rhimes Productions (Netflix)', price: 431.57 },
    { id: 28, name: 'Lemonade Media', price: 35.00 },
    { id: 29, name: 'Warner Bros Discovery (WBD)', price: 13.35 },
  ];

  const [investmentPrices, setInvestmentPrices] = useState(initialInvestments);

  const doSetInitialPrices = () => {
    setInvestmentPrices((prevPrices) =>
      prevPrices.map((investment) => ({
        ...investment,
        price: parseFloat((investment.price + Math.random() * 5 - 2.5).toFixed(2)), // Ensure it's a number
      }))
    );
  };
  

  useEffect(() => {
    doSetInitialPrices(); // Do immediately on load

    const interval = setInterval(() => {
      doSetInitialPrices();
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handleInvest = (investment) => {
    const investmentPrice = parseFloat(investment.price);
    if (balance >= investmentPrice) {
      setBalance(balance - investmentPrice);

      const existingInvestment = portfolio.find((item) => item.name === investment.name);
      if (existingInvestment) {
        const updatedPortfolio = portfolio.map((item) =>
          item.name === investment.name
            ? { ...item, quantity: item.quantity + 1, totalCost: item.totalCost + investmentPrice }
            : item
        );
        setPortfolio(updatedPortfolio);
      } else {
        setPortfolio([
          ...portfolio,
          { name: investment.name, quantity: 1, totalCost: investmentPrice, price: investmentPrice },
        ]);
      }
    } else {
      alert('Not enough balance to invest in this option.');
    }
  };

  const handleSell = (investmentName, quantityToSell, currentPrice) => {
    const investmentToSell = portfolio.find((item) => item.name === investmentName);
    if (investmentToSell && investmentToSell.quantity >= quantityToSell) {
      const saleValue = quantityToSell * currentPrice;
      const updatedPortfolio = portfolio
        .map((item) =>
          item.name === investmentName
            ? { ...item, quantity: item.quantity - quantityToSell, totalCost: item.totalCost - quantityToSell * item.price }
            : item
        )
        .filter((item) => item.quantity > 0); // Remove items with quantity
      setPortfolio(updatedPortfolio);
      setBalance(balance + saleValue); // Add the sale value to balance
    } else {
      alert('Not enough shares to sell.');
    }
  };

  const categories = [
    { title: 'Arts and Creativity', items: investmentPrices.slice(0, 4) },
    { title: 'Sports', items: investmentPrices.slice(4, 8) },
    { title: 'Technology and Gaming', items: investmentPrices.slice(8, 11) },
    { title: 'Science and Nature', items: investmentPrices.slice(11, 15) },
    { title: 'Books and Reading', items: investmentPrices.slice(15, 17) },
    { title: 'Building and Construction', items: investmentPrices.slice(17, 19) },
    { title: 'Animals and Pets', items: investmentPrices.slice(19, 21) },
    { title: 'Food and Cooking', items: investmentPrices.slice(21, 22) },
    { title: 'Travel and Exploration', items: investmentPrices.slice(22, 25) },
    { title: 'Social Causes and Activism', items: investmentPrices.slice(25, 27) },
    { title: 'Movies and TV Shows', items: investmentPrices.slice(27, 31) },
  ];

  return (
    <div className="investmentOptions">
      <h2 className="p-5">Based on your interests, here is what you might want to invest in</h2>

      {categories.map((category, index) => (
        <div key={index} className="investmentCategory">
          <h3>{category.title}</h3>
          <div className="investmentCardWrapper">
            {category.items.map((investment) => (
              <div className="investmentCard" key={investment.id}>
                <div className="inner">
                  <div className="InvestmentName">
                    <h4>{investment.name}</h4>
                  </div>
                  <p className="left">Risk: Medium</p>
                  <button className="buyInvestment widowsRed" onClick={() => handleInvest(investment)}>
                    Buy @ £{investment.price}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default InvestmentOptions;
