import React, { useState } from "react";
import "../styles/coincidence.css";
import MoreDetails from "./more_details";

function Coincidence_yellow({ image_url, name, lastname, date, nationality, link, values }) {
  const [var1, setVar1] = useState(false);
  return (
    <div className="containerCard yellowCard">
      <div className="personCard">
        <img className="imagenCard" src={image_url} alt="Desaparecido"></img>
        <ul>
          <li className="username"><strong>{lastname}</strong></li>
          <li>Nombre: {name}</li>
          <li><button onClick={() => { setVar1(true) }}>Más detalles</button></li>
        </ul>
      </div>
      <MoreDetails values={values} closeModal={var1} changeClose={setVar1} state="Desaparecido" />
    </div>
  );
}

export default Coincidence_yellow;
