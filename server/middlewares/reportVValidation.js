const ReportVValidations = (formData) => {
  console.log(formData)
  const errors = [];
  if(formData.reported_name === undefined || formData.reported_name === "" || typeof(formData.reported_name) !== "string" || !isNaN(parseInt(formData.reported_name))){
    errors.push("El nombre de la persona que reconoció es requerido")
  }
  if(formData.date_sighting === undefined || formData.date_sighting === "" || isNaN(Date.parse(formData.date_sighting))){
    errors.push("La fecha es requerida")
  }
  if(formData.state === undefined || formData.state === "" || typeof(formData.state) !== "string"){
    errors.push("El estado es requerido")
  }else if(formData.state !== "Reportado" && formData.state !== "Desaparecido"){
    errors.push("No es un estado válido")
  }
  if(formData.description === undefined || formData.description === ""){
    errors.push("La descripción del avistamiento es requerida")
  }
  if(formData.photo === undefined){
    errors.push("La imagen del avistamiento es requerida")
  }
  return errors
}

module.exports = ReportVValidations;