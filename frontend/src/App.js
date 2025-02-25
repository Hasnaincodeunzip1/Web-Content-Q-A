import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

function App() {
  // State variables
  const [urls, setUrls] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setAnswer('');
    setLoading(true);

    const urlList = urls.split('\n').filter(url => url.trim() !== '');

    try {
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/answer/', {
        // ...
      
        urls: urlList,
        question: question,
      });
      setAnswer(response.data.answer);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || 'An error occurred.');
      } else {
        setError('Network error or server is down.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Web Content Q&A</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="urls">URLs (one per line):</label><br />
          <textarea
            id="urls"
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            rows={5}
            cols={50}
            required
          />
        </div>
        <div>
          <label htmlFor="question">Question:</label><br />
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Ask Question'}
        </button>
      </form>
      {error && <div className="error">{error}</div>}
      {answer && (
        <div>
          <h2>Answer:</h2>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default App;