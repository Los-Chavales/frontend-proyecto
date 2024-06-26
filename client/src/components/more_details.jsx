import React, { useState } from "react";
import "../styles/coincidence.css"
import "../styles/bar_range.css"
import "../styles/more_details.css"
import Range from "../utils/hooks/Range";
import { Link } from "react-router-dom";

function MoreDetails({ values, state, closeModal, changeClose }) {
  const [closeDetails, setCloseDetails] = useState(false)
  const closeDiv = () => {
    setCloseDetails(true);
    setTimeout(() => {
      //console.warn("cerrar")
      changeClose(false);
      setCloseDetails(false);
    }, 345);
  }
  return (
    <>
      {closeModal &&
        <div className="div_detail">
          <div className={`${values.arrest_details ? 'redCard' : 'yellowCard'} containerCardMore ${closeDetails ? 'containerCardMoreClose' : ''}`}>

            <div className="close_container">
              <button className="close_button" onClick={closeDiv}>X</button>
            </div>

            <div className="personCardRedMore">

              <div className="divMore1">
                <div className="imagenCardMoreContainer">
                  <img className="imagenCardMore" src={values.image} alt="Reportado"></img>
                </div>
                <h2 className="usernameMore"><strong>{values.forename}</strong></h2>
              </div>

              <div className="divMore">
                <div className="divDetails">
                  <div className="divDetailsContents">
                    <ul className="divDetailsContents">
                      <li>Apellido: {values.name}</li>
                      <li>Fecha de nacimiento: {values.date_of_birth} </li>
                      <li>Nacionalidad: {values.nationalities}</li>
                      {!values.arrest_details && <li>ID: {values.entity_id}</li>}
                    </ul>
                    {values.arrest_details && <Range arrest_details={values.arrest_details} />}
                  </div>
                  <hr />
                  <div className="divDetailsBottons">
                    <Link to={`/report/${values.entity_id}/${values.forename}/${state}`} target="_blank" rel="noopener noreferrer" ><button className="more_button">Reportar</button></Link>
                    <Link to={`/coincidence_reports/${values.entity_id}`} target="_blank" rel="noopener noreferrer" ><button className="more_button">Ver Reportes</button></Link>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      }
    </>
  );

}

export default MoreDetails;
