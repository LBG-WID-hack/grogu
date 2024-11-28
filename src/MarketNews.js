import React, { useEffect, useState } from 'react';

function MarketNews() {
  const [news, setNews] = useState('');

  useEffect(() => {
    const randomEvents = [
      'Tech stocks soar as innovation accelerates!',
      'Bond yields drop, steady but modest returns.',
      'Real estate prices stabilize after recent fluctuations.',
      'Market uncertainty rises due to global tensions.',
    ];

    setNews(randomEvents[Math.floor(Math.random() * randomEvents.length)]);
  }, []);

  return (
    <div>
      <h2>Market News</h2>
      <p>{news}</p>
    </div>
  );
}

export default MarketNews;
