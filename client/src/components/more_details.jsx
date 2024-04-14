import React from "react";
import "../styles/coincidence.css"
import "../styles/bar_range.css"
import Range from "../utils/hooks/Range";
import Searcher_red from "../utils/hooks/Searcher_red.jsx"
import { Link } from "react-router-dom"; 

function MoreDetails({ values, state }) {
  return (
    <>
    <div className="closeDiv">
          <svg xmlns="http://www.w3.org/2000/svg" className="closeIcon" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
    <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
</svg> <input type="checkbox" name="closeCheck" id="closeCheck" />
        </div>
    <div className="div_detail">
   
    <div className="containerCardMore redCard">
      <div className="personCardRedMore">
        <div className="divMore1">
          <div className="imagenCardMoreContainer">
            <img className="imagenCardMore" src={values.image} alt="Reportado"></img>
          </div>
          <h2 className="usernameMore"><strong>{values.forename}</strong></h2>
        </div>

        <div className="divMore">
        
        <ul>
          <li>Apellido: {values.name}</li>
          <li>Nombre: {values.lastname}</li>

          <li>Fecha de nacimiento: {values.date_of_birth} </li>
          <li>Nacionalidad: {values.nationalities}</li>
          
        </ul>
        <Range arrest_details={values.arrest_details} />
        <hr />
        <Link to={`/report/${values.entity_id}/${values.forename}/${state}`} ><button>Reportar</button></Link>
        <Link to={`/coincidence_reports/${values.entity_id}`} target="_blank" rel="noopener noreferrer" ><button>Ver Reportes</button></Link>
        </div>

      </div>

    </div>
      </div>

      </>
  );
  
}

export default MoreDetails;
