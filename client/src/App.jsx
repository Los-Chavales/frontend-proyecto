import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/Auth_context';
import ProtectRoute from './ProtectRoute.jsx';
import { ReportProvider } from './context/Report_context';

import Header from './components/Header.jsx'
import Footer from "./components/Footer.jsx"
import FormPage from './pages/Form_page';
import SearcherPage_red from './pages/Searcher_page_red.jsx';
import SearcherPage_yellow from './pages/Searcher_page_yellow.jsx';
import RegisterPage from './pages/Register_page';
import LoginPage from './pages/Login_page';
import Disclaimer from './pages/Disclaimer_page.jsx';
import ReportsPage from './pages/Reports_page.jsx';
import UsersPage from './pages/Users_page.jsx';


function App() {

  return (
    <>
      <Header />
      <div className='contenido'>

        <AuthProvider>
          <ReportProvider>
            <Router>
              <Routes>
                <Route path="/red" element={<SearcherPage_red />} />
                <Route path="/yellow" element={<SearcherPage_yellow />} />
                <Route path="/report" element={<FormPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route element={<ProtectRoute />}>
                  <Route path="/home" element={<ReportsPage />} />
                  <Route path="/users" element={<UsersPage />} />
                </Route>
                <Route path="/discleimer" element={<Disclaimer />} />
              </Routes>
            </Router>
          </ReportProvider>
        </AuthProvider>

      </div>
      <Footer />
    </>
  )
}

export default App
