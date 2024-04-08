import './styles/App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import FormPage from './pages/Form_page'
import LandingPage from './pages/LandingPage'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/report" element={<FormPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
