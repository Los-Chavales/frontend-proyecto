import "../styles/landing_page.css"
import main_logo from "../assets/program Logos/main_logo.png"

function LandingPage() {
  return (
    <>
      <div className="white_1"></div>
      <header>
        <div className="main_text">
          <h1 className="page_title">Most Wanted Tracker</h1>
          <h3 className="page_subtitle">Unidos por un mundo más seguro</h3>
        </div>
      </header>
      <main className="landing_main">
        <div className="main_titles main_title_1"><h2 className="main_subtitles">Búsca y Reporta</h2></div>
        <div className="main_titles main_title_2"><h2 className="main_subtitles"></h2>A los criminales</div>
        <div className="main_titles main_title_3"><h2 className="main_subtitles"></h2>Más buscados</div>
      </main>

      
    </>
  )
}

export default LandingPage