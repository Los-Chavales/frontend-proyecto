const ReportsModel = require("../models/reports_model");
const FormValidations = require("../middlewares/formValidation")

class ReportsController{
  async registerReport(req, res) {

    let validationRes = FormValidations(req.body, req.file)
    if(validationRes.length !== 0){
      console.log(validationRes)
      return res.status(400).json({
        message: "Uno o más datos son incorrectos",
        status:false,
        errors:validationRes
      });
    }

    const {name, reported_name, email, date_sighting, phone, state, description} = req.body
    const photo = req.file.filename

    try {      
      const saveReport = new ReportsModel({
        name, 
        reported_name,
        email, 
        date_sighting, 
        phone, 
        state, 
        description,
        photo
      });
      await saveReport.save();
      console.log("Registrado con éxito")
      return res.status(200).json({
        message: "Registrado con éxito",
      });

    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "Error al registrar",
      });
    }
  }   

  async getReports (req, res) { // GET
    try {
      ReportsModel.find({}).then((data) => {
        return res.status(200).json({
          data: data,
        });
      });
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "Error al obtener datos",
      });
    }
  }
}

module.exports = new ReportsController();