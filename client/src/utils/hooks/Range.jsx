import React from "react";
import { useState, useEffect } from 'react';
import API_TRANSLATE from "../api/translator_api";
import calculate_range from "../functions/calculate_range";

function Range({ arrest_details }) {

  const [approved, setApproved] = useState(false);
  const [rangeDanger, setRangeDanger] = useState("");

  const fETCH_TRANSLATE = async (text) => {
    try {
      const RESULT = await API_TRANSLATE(text);
      let res = RESULT.data;
      let range;
      if (!res) {
        range = calculate_range(text);
        //console.warn("Error al traducir: No se obtuvo respuesta de la API");
      } else {
        range = calculate_range(res.translatedText);
      }
      setRangeDanger(range);
      setApproved(true);
    } catch (error) {
      console.error("Error al traducir:", error);
      setApproved(false);
    }
  }

  useEffect(() => {
    fETCH_TRANSLATE(arrest_details);
  }, []);


  return (
    <>
      {approved &&
        <div className="range">
          <p className="rangeP">Rango de Peligrosidad: {rangeDanger}</p>
          <div className="rangeBar">
            <div className="rangeBarProgress" style={{ width: rangeDanger }} ></div>
          </div>
        </div>
      }

    </>
  );
};

export default Range;