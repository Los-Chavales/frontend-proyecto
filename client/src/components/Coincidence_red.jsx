import React, { useState } from "react";
import "../styles/coincidence.css"
import "../styles/bar_range.css"
import Range from "../utils/hooks/Range";
import MoreDetails from "./more_details";

function Coincidence_red({ image_url, name, lastname, date, nationality, link, arrest_details, dates }) {
  console.log("dates")
  console.log(dates)
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
      {var1 && <MoreDetails dates={dates} />}

    </div>
  );
}

export default Coincidence_red;