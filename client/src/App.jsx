import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/Auth_context';
import Header from './components/Header.jsx'
import FormPage from './pages/Form_page';
import SearcherPage from './pages/Searcher_page';
import RegisterPage from './pages/Register_page';
import LoginPage from './pages/Login_page';

function App() {

  return (
    <>
      <Header />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<SearcherPage />} />
            <Route path="/report" element={<FormPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
