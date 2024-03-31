const ReportsModel = require("../models/reports_model");

class ReportsController{
  async registerReport(req, res) {
    const {name, email, date_sighting, phone, state, number_sighting} = req.body
    const photo = req.file.filename
    try {      
      const saveReport = new ReportsModel({
        name, 
        email, 
        date_sighting, 
        phone, 
        state, 
        number_sighting,
        photo
      });
      await saveReport.save();
      res.status(200).send("Registrado con éxito")

    } catch (error) {
      console.log(error)
      res.status(500).send("Error al registrar")
    }
  }   
}

module.exports = new ReportsController();