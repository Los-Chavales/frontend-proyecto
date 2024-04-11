import React from "react";
import "../styles/header.css"
import logo from "../assets/logo.png"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/Auth_context";

function Header() {
  const { user, logout, loading, isAuth } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    //console.debug("afuera", user, loading, isAuth)
    if (!loading && isAuth && user) {
      //console.debug("adentro", user, loading, isAuth)
      setUserData(user);
    } else {
      setUserData(null);
    }
    //console.debug(userData);
  }, [user])


  return (
    <>
      <header className="header" >
        <div className="div-logo" >
            <img src={logo} alt="Logo de la App" className="logo-header" />
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
                        <a href="/register" className="link">Registrate</a>
                    </li>
                     <li className="li_links">
                        <a href="/login" className="link">Login</a>
                    </li>
                    <li className="li_links">
                        <a href="/red" className="link">Alerta Roja</a>
                    </li>
                    <li className="li_links">
                        <a href="/yellow" className="link">Alerta Amarilla</a>
                    </li>
                    <li className="li_links">
                        <a href="/about_us" className="link">Sobre Nosotros</a>
                    </li>
                    
                </ul>
        {userData &&
          <div className="div-user">
            <p>Hola, {userData.username}</p>
            <Link to="/" onClick={() => { logout() }}><button className="button-login">Cerrar Sesión</button></Link>
          </div>
        }
      </header>
    </>
  );
}

export default Header;