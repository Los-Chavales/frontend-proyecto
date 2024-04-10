import React from "react";
import "../styles/header.css"

function Header() {
  return (
    <>
      <header className="header" > 
        <div className="div-logo" >
            <img src="src/assets/logo.png" alt="Logo de la App" className="logo-header" />
        </div>
        <label className="labe_hamburguesa" htmlFor="menu_hamburguesa">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="35"
                        fill="currentColor"
                        className="list_icon"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                        />
                    </svg>
                </label>
                <input type="checkbox" name="" id="menu_hamburguesa"/>
                <ul className="ul_links">
                <li className="li_links">
                        <a href="#" className="link">Registrate</a>
                    </li>
                     <li className="li_links">
                        <a href="#" className="link">Login</a>
                    </li>
                    <li className="li_links">
                        <a href="#" className="link">Alerta Roja</a>
                    </li>
                    <li className="li_links">
                        <a href="#" className="link">Alerta Amarilla</a>
                    </li>
                    <li className="li_links">
                        <a href="#" className="link">Sobre Nosotros</a>
                    </li>
                    
                </ul>
      </header>
    </>
  );
}

export default Header;