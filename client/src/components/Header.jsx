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
          <Link to="/"><img src={logo} alt="Logo de la App" className="logo-header" /></Link> 
        </div>
         {/* Mobile */}
        <div className="nav_container">
        {userData &&
          <div className="div-user">
            <p className="p-user">Hola, {userData.username}</p>
            <Link to="/" onClick={() => { logout() }}><button className="button-login">Cerrar Sesión</button></Link>
          </div>
        }
        <label className="labe_hamburguesa mobile" htmlFor="menu_hamburguesa">
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
                <input type="checkbox" name="" id="menu_hamburguesa" className="mobile"/>
                <ul className="ul_links mobile">
                   <li className="li_links">
                      <a href="/register" className="link mobile">Registrate</a>
                    </li>
                     <li className="li_links mobile">
                        <a href="/login" className="link mobile">Login</a>
                    </li>
                    <li className="li_links mobile">
                        <a href="/red" className="link mobile">Alerta Roja</a>
                    </li>
                    <li className="li_links mobile">
                        <a href="/yellow" className="link mobile">Alerta Amarilla</a>
                    </li>
                    <li className="li_links mobile">
                        <a href="/report" className="link mobile">Reportar</a>
                    </li>
                    <li className="li_links mobile">
                        <a href="/about_us" className="link mobile">Sobre Nosotros</a>
                    </li>
                    <li className="li_links mobile">
                        <a href="/discleimer" className="link mobile">Hecho por</a>
                    </li>
                    {/* Restringidas */}
                    <li className="li_links mobile">
                        <a href="/coincidence_reports_free" className="link mobile">Ver Reportes</a>
                    </li>
                    <li className="li_links mobile">
                        <a href="/home" className="link mobile">Administrar Reportes</a>
                    </li>
                    <li className="li_links mobile">
                        <a href="/users" className="link mobile">Administrar Usuarios</a>
                    </li>
                    
                </ul>


        {/* Navbar */}
        <ul className="ul_links">

          <li className="li_links hidden-li">
            <a href="#" className="link">Entrar↓</a>

            <ul className="ul_links_hidden">
              <li className="li_links_hidden">
                <a href="/register" className="link_hidden">Registrate</a>
              </li>
              <li className="li_links_hidden">
                <a href="/login" className="link_hidden">Login</a>
              </li>
            </ul>

          </li>    


          <li className="li_links">
            <a href="/red" className="link">Alerta Roja</a>
          </li>
          <li className="li_links">
            <a href="/yellow" className="link">Alerta Amarilla</a>
          </li>
          <li className="li_links">
            <a href="/report" className="link">Reportar</a>
          </li>

          <li className="li_links hidden-li">
            <a href="#" className="link">Acerca de↓</a>

            <ul className="ul_links_hidden">
              <li className="li_links_hidden">
                <a href="/about_us" className="link_hidden">Sobre Nosotros</a>
              </li>
              <li className="li_links_hidden">
                <a href="/discleimer" className="link_hidden">Hecho por</a>
              </li>
            </ul>

          </li>   


          {/* Restringidas*/}
          
          <li className="li_links hidden-li">
            <a href="#" className="link">Más Opciones↓</a>

            <ul className="ul_links_hidden">
              
              <li className="li_links_hidden">
                <a href="/coincidence_reports_free" className="link_hidden">Ver Reportes</a>
              </li>
              <li className="li_links_hidden">
                <a href="/home" className="link_hidden">Administrar Reportes</a>
              </li>
              <li className="li_links_hidden">
                <a href="/users" className="link_hidden">Administrar Usuarios</a>
              </li>
            </ul>

          </li>  

        </ul> 
                
      </div>
      </header>
    </>
  );
}

export default Header;