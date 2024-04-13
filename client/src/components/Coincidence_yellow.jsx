import React, { useState } from "react";
import "../styles/coincidence.css";
import MoreDetailsY from "./more_details_Y";

function Coincidence_yellow({ image_url, name, lastname, date, nationality, link, values }) {
  const [var1, setVar1] = useState(false);
  return (
    <div className="personCard yellowCard">
      <img className="imagenCard" src={image_url} alt="Desaparecido"></img>
      <ul>
        <li className="username"><strong>{lastname}</strong></li>
        <li>Nombre: {name}</li>
        <li>Fecha de nacimiento: {date}</li>
        <li>Nacionalidad: {nationality}</li>
        <li><button onClick={() => { setVar1(true) }}>Más detalles</button></li>
        {var1 && <MoreDetailsY values={values} state="Desaparecido"/>}
      </ul>
    </div>
  );
}

export default Coincidence_yellow;
