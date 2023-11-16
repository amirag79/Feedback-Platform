// FeedbackDisplay.js
import React from "react";

const FeedbackDisplay = ({ feedbackEntries }) => {
  return (
    <div>
      <h2>Saved Feedback Entries:</h2>
      <ul>
        {feedbackEntries.map((entry, index) => (
          <li key={index}>
            <strong>Name:</strong> {entry.name}, <strong>Email:</strong> {entry.email},{" "}
            <strong>Subject:</strong> {entry.subject}, <strong>Category:</strong> {entry.category},{" "}
            <strong>Comments:</strong> {entry.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackDisplay;



