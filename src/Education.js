import React from 'react';

function Education() {
  const tips = [
    "Start investing early to benefit from compounding returns.",
    "Diversify your investments to reduce risk.",
    "Understand the risk and reward for each investment option.",
    "Stay informed about market trends and news.",
  ];

  return (
    <div>
      <h2>Investment Tips</h2>
      <ul>
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}

export default Education;
