import React from "react";
import { useState, useEffect } from "react"
import { useReport } from "../../context/Report_context";

function Reports (){
  const { get_reports } = useReport();

  useEffect(() => {
    get_reports();
  }, [])

  return(
    <div>
      Reporte
    </div>
  );
}

export default Reports;