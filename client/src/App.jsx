import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import FormPage from './pages/Form_page';
import SearcherPage from './pages/Searcher_page';
import RegisterPage from './pages/Register_page';
import LoginPage from './pages/Login_page';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SearcherPage />} />
          <Route path="/report" element={<FormPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
