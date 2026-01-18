import { useState } from 'react'
import ReportDashboard from './features/reports/ReportDashboard'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ReportDashboard />
    </>
  )
}

export default App
