import React from "react";
import "../styles/coincidencia.css"

function Coincidencia ({ avatar_url, name, login, company, public_repos, enlace_github }) {
  return(
    <div className="usuarioCard">
      <img className="imagenCard" src={avatar_url}></img>
      <ul>
        <li className="username"><strong>{login}</strong></li>
        <li>Nombre: {name}</li>
        {company && <li>Empresa: {company}</li>}
        <li>Repositorios públicos: {public_repos}</li>
        <li><a href={enlace_github} target="_blank">Visitar Github</a></li>
      </ul>
    </div>
  );
}

export default Coincidencia;
