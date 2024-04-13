const ReportsModel = require("../models/reports_model");
const FormValidations = require("../middlewares/formValidation")

class ReportsController {
  async registerReport(req, res) {

    let validationRes = FormValidations(req.body, req.file)
    if (validationRes.length !== 0) {
      console.log(validationRes)
      return res.status(400).json({
        message: "Uno o más datos son incorrectos",
        status: false,
        errors: validationRes
      });
    }

    const { name, reported_name, email, date_sighting, phone, state, description } = req.body
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
        message: error,
      });
    }
  }   

  async showReports (req, res) { // GET
    try {
      ReportsModel.find({}).then((data) => {
        return res.status(200).json(data);
      });
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "Error al obtener datos",
      });
    }
  }

  async approveReport(req, res) {
/*
    if (!req.user) return res.status(500).json({ message: "Sin datos del token" });

    const { id, status } = req.body;
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
        message: error,
      });
    }
    */
  } 
}

module.exports = new ReportsController();