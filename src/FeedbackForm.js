import "./Form.css";
import { useEffect, useRef, useState } from "react";
import FeedbackDisplay from "./FeedBackDisplay";
export default function Form() {
  const nameRef = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState(""); // Added category state
  const [result, setResult] = useState("");
  const [feedbackEntries, setFeedbackEntries] = useState([]);
  const [showForm, setShowForm] = useState(true);



  const handleSubmit = async (e) => {
    setResult("");
    e.preventDefault();

    // validating data
    if (!name || !email || !subject || !category || text?.length < 10) {
      setResult("Please verify your inputs ...");
      return null;
    }

    const data = { name, email, subject, category, text }; // Include category in the data
    setFeedbackEntries((prevEntries) => [...prevEntries, data]);

    fetch("http://localhost:3000", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response;
      })
      .then((json) => {
        console.log(json?.message);
        setResult(`Result: ${json?.message}`);
        setShowForm(false);
      })
      .catch((error) => {
        console.log(error?.message);
        setResult(`Error: ${error?.message}`);
      });
  };

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, []);

  return (
    <div className="App">
      <h1>Customer Feedback Form</h1>
      {showForm ? (
      <form onSubmit={handleSubmit} className="form__container">
        {/* ... Other input fields ... */}
        <div className="form__controls">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            <option value="Product Features">Product Features</option>
            <option value="Product Pricing">Product Pricing</option>
            <option value="Product Usability">Product Usability</option>
          </select>

        </div>
        {/* ... Other input fields ... */}
        <div className="form__controls">
          <label htmlFor="name">Name</label>
          <input
            ref={nameRef}
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form__controls">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form__controls">
          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            className="input__subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="form__controls">
          <label htmlFor="text">Comments</label>
          <textarea
            rows="5"
            id="text"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        
        <div className="form__controls">
          <button className="button">Send Feedback</button>
        </div>
     </form>
      ):(<FeedbackDisplay feedbackEntries={feedbackEntries} />)}
      <p>{result}</p>

      
    
    </div>

  );
}
