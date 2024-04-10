import React from "react";
import "../styles/coincidence.css"
import "../styles/bar_range.css"
import Range from "../utils/hooks/Range";
import Searcher_red from "../utils/hooks/Searcher_red.jsx"
/* import { Link } from "react-router-dom"; */

function MoreDetails({ dates }) {
  return (
    <>
    <div className="div_detail">
    <div className="containerCard redCard">
      <div className="personCardRed">
        <img className="imagenCard" src={dates.image} alt="Reportado"></img>
        <ul>
          <li className="username"><strong>{dates.forename}</strong></li>
          <li>Nombre: {dates.name}</li>
          <li>Fecha de nacimiento: {dates.date_of_birth} </li>
          <li>Nacionalidad: {dates.nationalities}</li>
        </ul>
      </div>
      <Range arrest_details={dates.arrest_details} />
{/*       <Link to="/report" ><button>Reportar</button></Link> */}

    </div>
      </div>

      </>
  );
  
}

export default MoreDetails;
