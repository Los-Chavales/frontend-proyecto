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
import LandingPage from './pages/LandingPage';
import AboutUs from './pages/AboutUs_page.jsx';
import CoincidenceReports from './pages/Coincidence_reports.jsx';
import CoincidenceReportsFree from './pages/Coincidence_reports_free.jsx';


const NotFound = () => {
  return (
    <>
      <div className='notFound'>
        <h1>404 - Página no encontrada</h1>
        <p>Lo sentimos, la página que buscas no se encuentra disponible.</p>
      </div>
    </>
  );
};

function App() {

  return (
    <>
      <AuthProvider>
        <ReportProvider>
          <Router>
            <Header />
            <div className='contenido'>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/red" element={<SearcherPage_red />} />
                <Route path="/yellow" element={<SearcherPage_yellow />} />
                <Route path="/report" element={<FormPage />} />
                <Route path="/report/:id/:name_report/:state" element={<FormPage />} />
                <Route path="/coincidence_reports/:id" element={<CoincidenceReports />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/discleimer" element={<Disclaimer />} />
                <Route element={<ProtectRoute />}>
                  <Route path="/coincidence_reports_free" element={<CoincidenceReportsFree />} />
                  <Route path="/home" element={<ReportsPage />} />
                  <Route path="/users" element={<UsersPage />} />
                </Route>
                <Route path="/about_us" element={<AboutUs />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </Router>
        </ReportProvider>
      </AuthProvider>
    </>
  )
}

export default App
