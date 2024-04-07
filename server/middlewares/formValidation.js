const FormValidations = (formData, formDatafile) => {
  console.log(formData)
  const errors = [];
  if(formData.name === undefined || formData.name === "" || typeof(formData.name) !== "string" || !isNaN(parseInt(formData.name))){
    errors.push("El nombre es requerido")
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
  if(formDatafile === undefined){
    errors.push("La imagen del avistamiento es requerida")
  }
  return errors
}

module.exports = FormValidations;