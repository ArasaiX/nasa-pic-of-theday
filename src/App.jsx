import { useEffect, useState } from 'react'

import './App.css'

const API_KEY = import.meta.env.VITE_API_KEY;
const DATE = new Date().toISOString().split('T')[0]



function App() {
  const [data, setData] = useState(null)
  const [date, setDate] = useState(DATE)

  const getPicture = async () => {
    console.log("date", DATE)
    const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`
    const response = await fetch(url)
    const data = await response.json()
    return data
  }

  useEffect(() => {
    getPicture().then(data => setData(data))
  }, [date])

  return (
    <>
      <h1>Space picture of the day by NASA</h1>
      <div>
        {data && (
          <>
            <h2>{data.title}</h2>
            <p>{data.explanation}</p>
          <img src={data.url} alt="" />
          </>
        )}
      </div>
      <div>
        <h2>Select a date to see NASA's picture for that day</h2>
        <label htmlFor="date">Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      
    </>
  )
}

export default App
