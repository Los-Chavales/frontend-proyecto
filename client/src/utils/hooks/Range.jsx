import React from "react";
import { useState, useEffect } from 'react';
import API_TRANSLATE from "../api/translator_api";
import calculate_range from "../functions/calculate_range";

function Range({ arrest_details }) {


  const [rangeDanger, setRangeDanger] = useState("")

  const fETCH_TRANSLATE = async (text) => {
    try {
      const RESULT = await API_TRANSLATE(text);
      if (!RESULT.data) return console.warn("Error al traducir: No se obtuvo respuesta de la API")
      let res = RESULT.data.translatedText;
      let range = calculate_range(res);
      setRangeDanger(range);
    } catch (error) {
      console.error("Error al traducir:", error);
    }
  }

  useEffect(() => {
    fETCH_TRANSLATE(arrest_details);
  }, []);


  return (
    <>
      <div className="range">
        <p className="rangeP">Rango de Peligrosidad: {rangeDanger}</p>
        <div className="rangeBar">
          <div className="rangeBarProgress" style={{ width: rangeDanger }} ></div>
        </div>
      </div>
    </>
  );
};

export default Range;