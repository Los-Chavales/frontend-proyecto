import React from "react";
import "../styles/coincidence.css";

function Coincidence_yellow({ image_url, name, lastname, date, nationality, link }) {
  return (
    <div className="personCard yellowCard">
      <img className="imagenCard" src={image_url} alt="Desaparecido"></img>
      <ul>
        <li className="username"><strong>{lastname}</strong></li>
        <li>Nombre: {name}</li>
        <li>Fecha de nacimiento: {date}</li>
        <li>Nacionalidad: {nationality}</li>
      </ul>
    </div>
  );
}

export default Coincidence_yellow;
