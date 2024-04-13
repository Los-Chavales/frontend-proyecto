const ReportsModel = require("../models/reports_model");
const FormValidations = require("../middlewares/formValidation")
const { v4: uuidv4 } = require('uuid');

class ReportsController {
  async registerReport(req, res) {

    if(!req.body.id_notice){
      req.body.id_notice = uuidv4();
    }

    let validationRes = FormValidations(req.body, req.file)
    if (validationRes.length !== 0) {
      console.log(validationRes)
      return res.status(400).json({
        message: "Uno o más datos son incorrectos",
        status: false,
        errors: validationRes
      });
    }

    const { name, reported_name, email, date_sighting, phone, state, description, id_notice, type_report } = req.body
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
        photo,
        id_notice,
        type_report
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

  async showReports(req, res) { // GET
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
    if (!req.user) return res.status(500).json({ message: "Sin datos del token" });
    if (!Array.isArray(req.body)) return res.status(400).json({ message: "No es un array" });

    let uptad = false;
    for (const reportUp of req.body) {
      console.log("desde el backeend")
      console.log(reportUp)
      if (!reportUp) return res.status(400).json({ message: "Sin datos", data: req.body, value: reportUp });
      const { _id, status } = reportUp;
      if (!_id || typeof _id != 'string') return res.status(400).json({ message: "ID inválido", value: _id });
      if (status == undefined || typeof status != 'boolean') return res.status(400).json({ message: "Status inválido", value: status });
      try {
        const report = await ReportsModel.findById(_id);
        report.status = status;
        const upReport = await ReportsModel.findByIdAndUpdate(report._id, report);
        console.log('Actualizado', report, upReport);
        uptad = true;
        //console.log(reportUp);
      } catch (error) {
        uptad = false;
        console.log(error);
        return res.status(500).json({
          message: "Error al obtener datos",
          error: error,
        });
      }
    }
    if (uptad) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  }


  async coincidenceReports(req, res) {
    let id_notice_params = req.params.id;
    try {
      ReportsModel.find({ id_notice: id_notice_params, status : true }).find({}).then((data) => {
        if(data.length === 0) {
          return res.status(404).json({
            message:"No existen casos registrados"
          });
        }else{
          return res.status(200).json(data);
        }
      });
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "Error al obtener datos",
      });
    }
  }

  async coincidenceReportsFree(req, res) {
    try {
      ReportsModel.find({ type_report: "free", status : true}).find({}).then((data) => {
        if(data.length === 0) {
          return res.status(404).json({
            message:"No existen casos registrados"
          });
        }else{
          return res.status(200).json(data);
        }
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