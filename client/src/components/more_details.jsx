import React from "react";
import "../styles/coincidence.css"
import "../styles/bar_range.css"
import Range from "../utils/hooks/Range";
import Searcher_red from "../utils/hooks/Searcher_red.jsx"



function MoreDetails({ image_url, name, lastname, date, nationality, link, arrest_details }) {
  return (
    <>
    <Searcher_red/>
    <div className="div_detail">
    <div className="containerCard redCard">
      <div className="personCardRed">
        <img className="imagenCard" src={image_url} alt="Reportado"></img>
        <ul>
          <li className="username"><strong>{lastname}</strong></li>
          <li>Nombre: {name}</li>
          <li>Fecha de nacimiento: {date}</li>
          <li>Nacionalidad: {nationality}</li>
        </ul>
      </div>
      <Range arrest_details={arrest_details} />

    </div>
      </div>

      </>
  );
  
}

export default MoreDetails;
