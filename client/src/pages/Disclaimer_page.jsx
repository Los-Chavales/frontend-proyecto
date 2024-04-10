import "../styles/disclaimer.css"
import UvmLogo from "../assets/uvm.png"
function Disclaimer(){
    return(
        <main className="disclaimer_container">
            <div className="disclaimer_info">
            
                <div className="discleimer-logo">
                    <div className="uvm-div">
                        <img src={UvmLogo} alt="Logo" className="uvm-img" />
                    </div>
                </div>
                <div className="discleimer-mensaje">
                        <p>Este proyecto fue realizado con fines netamente educativos para  obtener conocimientos y fomentar nuestro aprendizaje enfocado a programación en la asignatura Frontend I </p>
                </div>
                
            </div>
        </main>
    )


}

export default Disclaimer