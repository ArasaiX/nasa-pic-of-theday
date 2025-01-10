import { useEffect, useState } from 'react';
import './App.css';

const API_KEY = import.meta.env.VITE_API_KEY;
const DATE = new Date().toISOString().split('T')[0];

function App() {
  const [data, setData] = useState(null);
  const [date, setDate] = useState(DATE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the picture from NASA API
  const getPicture = async (selectedDate) => {
    setLoading(true);
    setError(null);
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
    getPicture(date);
  }, [date]);

  return (
    <>
      <h1>Space picture of the day by NASA</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
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
    </>
  );
}

export default App;
