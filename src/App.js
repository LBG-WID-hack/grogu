import React, { useState } from "react";
import './App.css';

function App() {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState(null); // New state to track button action

  const interests = [
    { name: "Arts and Creativity", img: "https://storage.googleapis.com/lbg-wid-hack-grogu-media/assets/Arts%20%26%20Crafts.webp" }, // Add your GCP URL here
    { name: "Sports", img: "https://storage.googleapis.com/lbg-wid-hack-grogu-media/assets/Sport.webp" }, // Add your GCP URL here
    { name: "Technology and Gaming", img: "https://storage.googleapis.com/lbg-wid-hack-grogu-media/assets/Tech.webp" }, // Add your GCP URL here
    { name: "Science and Nature", img: "https://storage.googleapis.com/lbg-wid-hack-grogu-media/assets/Science.webp" }, // Add your GCP URL here
    { name: "Books and Reading", img: "https://storage.googleapis.com/lbg-wid-hack-grogu-media/assets/Reading.webp" }, // Add your GCP URL here
    { name: "Building and Construction", img: "https://storage.googleapis.com/lbg-wid-hack-grogu-media/assets/Building%20%26%20Construction.webp" }, // Add your GCP URL here
    { name: "Social Activities", img: "https://storage.googleapis.com/lbg-wid-hack-grogu-media/assets/Social.webp" }, // Add your GCP URL here
    { name: "Animals and Pets", img: "https://storage.googleapis.com/lbg-wid-hack-grogu-media/assets/Animals%20%26%20Pets.webp" }, // Add your GCP URL here
    { name: "Food and Cooking", img: "https://storage.googleapis.com/lbg-wid-hack-grogu-media/assets/Food.webp" }, // Add your GCP URL here
    { name: "Travel and Exploration", img: "https://storage.googleapis.com/lbg-wid-hack-grogu-media/assets/Travel.webp" }, // Add your GCP URL here
    { name: "Social Causes and Activism", img: "https://storage.googleapis.com/lbg-wid-hack-grogu-media/assets/Activism.webp" }, // Add your GCP URL here
    { name: "Movies and TV Shows", img: "https://storage.googleapis.com/lbg-wid-hack-grogu-media/assets/Movies.webp" }, // Add your GCP URL here
  ];

  const toggleInterest = (index) => {
    if (selectedInterests.includes(index)) {
      setSelectedInterests(selectedInterests.filter(item => item !== index));
    } else if (selectedInterests.length < 3) {
      setSelectedInterests([...selectedInterests, index]);
    }
  };

  const handleSubmit = () => {
    if (selectedInterests.length === 3) {
      setSubmissionStatus("Submitted!"); // Set state to indicate success
      const selected = selectedInterests.map(i => interests[i].name);
      alert(`Selected Interests: ${selected.join(", ")}`);
    } else {
      setSubmissionStatus("Please select 3 interests.");
    }
  };

  return (
    <div className="App">
      <h1>Select 3 interests to start investing:</h1>

      <div className="interest-grid">
        {interests.map((interest, index) => (
          <div
            key={index}
            className={`interest-item ${selectedInterests.includes(index) ? "selected" : ""}`}
            onClick={() => toggleInterest(index)}
          >
            {interest.img ? (
              <img src={interest.img} alt={interest.name} className="interest-image" />
            ) : (
              <div className="placeholder-image">Image</div>
            )}
            <span className="interest-name">{interest.name}</span>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={selectedInterests.length !== 3}
        className="submit-button"
      >
        Submit
      </button>

      {/* Display status message */}
      {submissionStatus && (
        <div className="status-message">
          {submissionStatus}
        </div>
      )}
    </div>
  );
}

export default App;
