import React from "react";
import "../styles/loader.css"

function Loading ({loader_tipo}) {
  return(
    <div className={loader_tipo ? "loader-spinner-pantalla" : "loader-spinner"}></div>
  );
}

export default Loading;