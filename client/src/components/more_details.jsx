import React from "react";
import "../styles/coincidence.css"
import "../styles/bar_range.css"
import Range from "../utils/hooks/Range";
import Searcher_red from "../utils/hooks/Searcher_red.jsx"



function MoreDetails({ dates }) {
  return (
    <>
    <div className="div_detail">
    <div className="containerCardMore redCard">
      <div className="personCardRedMore">
        <div className="divMore1">
        <img className="imagenCardMore" src={dates.image} alt="Reportado"></img>
        <h2 className="usernameMore"><strong>{dates.forename}</strong></h2>
        </div>

        <div className="divMore">
        <ul>
          <li>Apellido: {dates.name}</li>
          <li>Nombre: {dates.lastname}</li>

          <li>Fecha de nacimiento: {dates.date_of_birth} </li>
          <li>Nacionalidad: {dates.nationalities}</li>
          
        </ul>
        <Range arrest_details={dates.arrest_details} />
        <hr />
        <button className="buttonMore">Reportar</button>
        </div>

      </div>

    </div>
      </div>

      </>
  );
  
}

export default MoreDetails;
