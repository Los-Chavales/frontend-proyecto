import "../styles/about_us.css"
import LupaLogo from "../assets/lupita.png"
function AboutUs(){
    return(
        <main className="about_us-container">
           <div className="Prueba"></div>
            <div className="aboutus-logo">
                <div className="imagen-div">
                    <img src={LupaLogo} alt="Logo de MW Tracked" className="lupa-img" />
                    <div className="mensaje-ppal">
                    <p>Most Wanted Tracked es una página que consume la API de la Interpol para tener funciones como buscar personas desaparecidas y aquellas personas prófugas de la ley a nivel internacional, permitiendo realizar reportes </p>
                    </div>
                </div>
            </div>
            <div className="info">
                  <div className="info-1">
                    <p className="info-p1">La Organización Internacional de Policía Criminal es la mayor organización de policía internacional que une a las fuerzas de seguridad de 196 países de todo el mundo</p>
                  </div>
                  <div className="info-2">
                  <p>Una notificación roja es un aviso internacional sobre una persona buscada,se utilizan para avisar  a los servicios policiales de todos los países miembros de la existencia de prófugos buscados a escala internacional</p>
                  </div>
                  <div className="info-3">
                  <p>
                  Una notificación amarilla es una alerta policial mundial sobre una persona desaparecida, se publican para ayudar a localizar a personas desaparecidas, niños, adultos y mayores que incluso son incapaces de identificarse a sí mismos
                  </p>
                  </div>  
            </div>
            
        </main>
    )


}

export default AboutUs