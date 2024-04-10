import Form from "../utils/hooks/Form.jsx"
import Sent from "../components/Sent.jsx"
import "../styles/form_contact.css"
import { useReport } from "../context/Report_context.jsx"

function FormPage() {
  const { mensage } = useReport();
  return (
    <>
      <section className="contact_container">
        <h1 className="contact_title" >{mensage ? "Reporte Registrado":"Si posee información valiosa sobre algún avistamiento ¡Contáctenos!"}</h1> 
        { mensage ? <Sent></Sent>: <Form />} 
      </section>
    </>
  )
}

export default FormPage