import React from "react";
import "../styles/coincidence.css"
import "../styles/bar_range.css"
import Range from "../utils/hooks/Range";

function Coincidence({ image_url, name, lastname, date, nationality, link, arrest_details }) {
  return (
    <div className="usuarioCard">
      <img className="imagenCard" src={image_url}></img>
      <ul>
        <li className="username"><strong>{lastname}</strong></li>
        <li>Nombre: {name}</li>
        <li>Fecha de nacimiento: {date}</li>
        <li>Nacionalidad: {nationality}</li>
        <li><a href={link} target="_blank">Más detalles</a></li>
      </ul>
      <Range arrest_details={arrest_details} /> 
    </div>
  );
}

export default Coincidence;
