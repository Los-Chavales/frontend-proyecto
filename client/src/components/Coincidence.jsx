import React from "react";
import "../styles/coincidence.css"

function Coincidence({ image_url, name, lastname, date, nationality, link }) {
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
    </div>
  );
}

export default Coincidence;
