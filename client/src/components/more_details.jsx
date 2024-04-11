import React from "react";
import "../styles/coincidence.css"
import "../styles/bar_range.css"
import Range from "../utils/hooks/Range";
import Searcher_red from "../utils/hooks/Searcher_red.jsx"
import { Link } from "react-router-dom"; 

function MoreDetails({ values }) {
  return (
    <>
    <div className="div_detail">
    <div className="containerCardMore redCard">
      <div className="personCardRedMore">
        <div className="divMore1">
          <div className="imagenCardMoreContainer">
            <img className="imagenCardMore" src={values.image} alt="Reportado"></img>
          </div>
          <h2 className="usernameMore"><strong>{values.forename}</strong></h2>
        </div>

        <div className="divMore">
        <ul>
          <li>Apellido: {values.name}</li>
          <li>Nombre: {values.lastname}</li>

          <li>Fecha de nacimiento: {values.date_of_birth} </li>
          <li>Nacionalidad: {values.nationalities}</li>
          
        </ul>
        <Range arrest_details={values.arrest_details} />
        <hr />
        <Link to="/report" ><button className="buttonMore">Reportar</button></Link>
        </div>

      </div>

    </div>
      </div>

      </>
  );
  
}

export default MoreDetails;
