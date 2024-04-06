import './styles/App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import FormPage from './pages/Form_page'
import SearcherPage from './pages/Searcher_page'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SearcherPage />} />
          <Route path="/report" element={<FormPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
