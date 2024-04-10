import React from "react";
import "../styles/header.css"
import logo from "../assets/logo.png"

function Header() {
  return (
    <>
      <header className="header" > 
        <div className="div-logo" >
            <img src={logo} alt="Logo de la App" className="logo-header" />
        </div>
      </header>
    </>
  );
}

export default Header;