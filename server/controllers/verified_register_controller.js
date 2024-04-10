const VerifiedReportsModel = require("../models/verified_register_model");
const ReportVValidations = require("../middlewares/reportVValidation")

class ReportsVController {
  async registerReport(req, res) {

  let validationRes = ReportVValidations(req.body)
    if (validationRes.length !== 0) {
      console.log(validationRes)
      return res.status(400).json({
        message: "Uno o más datos son incorrectos",
        status: false,
        errors: validationRes
      });
    } 

    const { reported_name, date_sighting, state, description, photo } = req.body

    try {
      const saveReportV = new VerifiedReportsModel({
        reported_name,
        date_sighting,
        state,
        description,
        photo
      });
      await saveReportV.save();
      console.log("Verificado con éxito")
      return res.status(200).json({
        message: "Verificado con éxito",
      });

    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: error,
      });
    }
  }   
}

module.exports = new ReportsVController();