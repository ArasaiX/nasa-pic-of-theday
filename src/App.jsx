import { useEffect, useState } from 'react';
import './App.css';

const API_KEY = import.meta.env.VITE_API_KEY; // Make sure this is correctly set in your .env file
const today = new Date();
today.setDate(today.getDate() - 1); // Subtract one day

const DATE = today.toISOString().split('T')[0]; // Get the new date in YYYY-MM-DD format

function App() {
  const [data, setData] = useState(null);
  const [date, setDate] = useState(DATE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the picture from NASA API
  const getPicture = async (selectedDate) => {
    setLoading(true);
    setError(null);

    // Ensure the API key and date are valid before making the request
    if (!API_KEY || !selectedDate) {
      setError('API key or date is missing');
      setLoading(false);
      return;
    }

    const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${selectedDate}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch picture on page load and when the date changes
  useEffect(() => {
    // Only fetch if the API key and date are set
    if (API_KEY) {
      getPicture(date);
    } else {
      setError('API key is missing');
      setLoading(false);
    }
  }, [date]);

  return (
    <div className="app">
      <h1>Space picture of the day by NASA</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>Error: {error}. Please reload the page or select another day</p>
      ) : (
        <div>
          {data && (
            <>
              <h2>{data.title}</h2>
              <p>{data.explanation}</p>
              <img src={data.url} alt={data.title} />
            </>
          )}
        </div>
      )}

      <div>
        <h2>Select a date to see NASA's picture for that day</h2>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
    </div>
  );
}

export default App;
