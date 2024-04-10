import React from "react";
import "../styles/coincidence.css"
import "../styles/bar_range.css"
import Range from "../utils/hooks/Range";
import { Link } from "react-router-dom"; 

function MoreDetails({ values }) {
  console.log("Estás en detalles")
  console.log(values)
  console.log("El id es:")
  console.log(values.entity_id)
  let rute = "/report/:" + values.forename
  console.log("rutas:")
  console.log(rute)
  return (
    <>
    <div className="div_detail">
    <div className="containerCard redCard">
      <div className="personCardRed">
        <img className="imagenCard" src={values.image} alt="Reportado"></img>
        <ul>
          <li className="username"><strong>{values.forename}</strong></li>
          <li>Nombre: {values.name}</li>
          <li>Fecha de nacimiento: {values.date_of_birth} </li>
          <li>Nacionalidad: {values.nationalities}</li>
        </ul>
      </div>
      <Range arrest_details={values.arrest_details} />
      <Link to="/report" ><button>Reportar</button></Link>

    </div>
      </div>

      </>
  );
  
}

export default MoreDetails;
