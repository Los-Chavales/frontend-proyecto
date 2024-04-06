import React from "react";
import "../styles/header.css"

function Header() {
  return (
    <>
      <header className="header" > 
        <div className="div-logo" >
            <img src="src/assets/logo.png" alt="Logo de la App" className="logo-header" />
        </div>
      </header>
    </>
  );
}

export default Header;