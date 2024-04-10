import React from "react";
import "../styles/header.css"
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
          <img src="src/assets/logo.png" alt="Logo de la App" className="logo-header" />
        </div>
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