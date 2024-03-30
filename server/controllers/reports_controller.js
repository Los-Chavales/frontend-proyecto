const ReportsModel = require("../models/reports_model");

class ReportsController{
  async registerReport(req, res) {
    console.log(req.body)
    const {name, email, date_sighting, phone, state, number_sighting} = req.body
    try {      

      const saveReport = new ReportsModel({
        name, 
        email, 
        date_sighting, 
        phone, 
        state, 
        number_sighting
      });
      await saveReport.save();
      res.status(200).send("Registrado con éxito")

    } catch (error) {

      console.log(error)

    }
  }
}

module.exports = new ReportsController();