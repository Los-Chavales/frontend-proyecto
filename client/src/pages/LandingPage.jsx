import "../styles/landing_page.css"
import main_logo from "../assets/program Logos/main_logo.png"
import "../styles/App.css"

function LandingPage() {
  return (
    <>
     {/*  <div className="white_1"></div> */}
      <section>
        <div className="main_text">
          <h1 className="page_title">Most Wanted Tracker</h1>
          <h3 className="page_subtitle">Unidos por un mundo más seguro</h3>
        </div>
      </section>
      <main className="landing_main">
        <div className="main_titles main_title_1"><h2 className="main_subtitles">Búsca y reporta</h2></div>
        <div className="main_titles main_title_2"><h2 className="main_subtitles">A los criminales</h2></div>
        <div className="main_titles main_title_3"><h2 className="main_subtitles">Más buscados</h2></div>
      </main>

      
    </>
  )
}

export default LandingPage