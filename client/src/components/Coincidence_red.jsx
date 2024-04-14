import React from "react";
import { useState, useEffect } from "react";
import "../styles/coincidence.css"
import "../styles/bar_range.css"
import Range from "../utils/hooks/Range"; 
import MoreDetails from "./more_details";

function Coincidence_red({ image_url, name, lastname, date, nationality, link, arrest_details, values }) {
  const [var1, setVar1] = useState(false);
  return (
    <div className="containerCard redCard">
      <div className="personCardRed">
        <img className="imagenCard" src={image_url} alt="Reportado"></img>
        <ul>
          <li className="username"><strong>{lastname}</strong></li>
          <li>Nombre: {name}</li>
          <li><button onClick={() => { setVar1(true) }}>Más detalles</button></li>
        </ul>
      </div>
      <Range arrest_details={arrest_details} />
      <MoreDetails values={values} closeModal={var1} changeClose={setVar1} state="Reportado" />
    </div>
  );
}

export default Coincidence_red;