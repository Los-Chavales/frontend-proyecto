const FormValidations = (formData, formDatafile) => {
  console.log(formData)
  const errors = [];
  if(formData.name === undefined || formData.name === "" || typeof(formData.name) !== "string" || !isNaN(parseInt(formData.name))){
    errors.push("El nombre es requerido")
  }
  if(formData.reported_name === undefined || formData.reported_name === "" || typeof(formData.reported_name) !== "string" || !isNaN(parseInt(formData.reported_name))){
    errors.push("El nombre de la persona que reconoció es requerido")
  }
  if(formData.email === undefined || formData.email === "" || typeof(formData.email) !== "string"){
    errors.push("El email es requerido")
  }
  if(formData.date_sighting === undefined || formData.date_sighting === "" || isNaN(Date.parse(formData.date_sighting))){
    errors.push("La fecha es requerida")
  }
  if(formData.phone === undefined || formData.phone === "" || typeof(formData.phone) !== "string"){
    errors.push("El teléfono es requerido")
  }
  if(formData.state === undefined || formData.state === "" || typeof(formData.state) !== "string"){
    errors.push("El estado es requerido")
  }else if(formData.state !== "Reportado" && formData.state !== "Desaparecido"){
    errors.push("No es un estado válido")
  }
  if(formData.description === undefined || formData.description === ""){
    errors.push("La descripción del avistamiento es requerida")
  }
  if(formData.type_report === undefined || formData.type_report === "" || typeof(formData.type_report) !== "string"){
    errors.push("El tipo de reporte es requerido")
  }else if(formData.type_report !== "apiData" && formData.type_report !== "free"){
    errors.push("No es un tipo de reporte válido")
  }
  if(formDatafile === undefined){
    errors.push("La imagen del avistamiento es requerida")
  }
  return errors
}

module.exports = FormValidations;