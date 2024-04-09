import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/Auth_context';
import Header from './components/Header.jsx'
import Footer from "./components/Footer.jsx"
import FormPage from './pages/Form_page';
import SearcherPage_red from './pages/Searcher_page_red.jsx';
import SearcherPage_yellow from './pages/Searcher_page_yellow.jsx';
import RegisterPage from './pages/Register_page';
import LoginPage from './pages/Login_page';
import LandingPage from './pages/LandingPage';

function App() {

  return (
    <>
      <Header />
      <div className='contenido'>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/red" element={<SearcherPage_red />} />
            <Route path="/yellow" element={<SearcherPage_yellow />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/report" element={<FormPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>
      </AuthProvider>
      </div>
      <Footer/>
    </>
  )
}

export default App
