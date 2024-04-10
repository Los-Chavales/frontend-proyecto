import React from "react";
import { useState, useEffect } from "react";
import "../styles/sent.css"

function Sent(texts) {
  const [t2, setT2] = useState("Gracias por la Información");
  const [pt, setPt] = useState("Le estaremos contactando si necesitamos más detalles");

  useEffect(() => {
    if (texts.title) setT2(texts.title);
    if (texts.par) setPt(texts.par);
  }, [texts])


  return (
    <>
      <div className="sent_container" >
        <div className="sent_info">
          <h2>{t2}</h2>
          <p>{pt}</p>
        </div>
      </div>
    </>
  );
}

export default Sent;