let express = require('express');
let router = express.Router();
const ReportsController = require("../controllers/reports_controller");
const upload = require("../middlewares/storage")
const { auth } = require("../middlewares/validate_token.js");


/* GET */
router.get("/", auth, ReportsController.showReports);

/* con datos de la api */
router.get("/coincidence_reports/:id", ReportsController.coincidenceReports);

/* registrados libremente */
router.get("/coincidence_reports_free", ReportsController.coincidenceReportsFree);

/* POST */
router.post('/register', upload.single("image"), ReportsController.registerReport);

router.post('/approve', auth, ReportsController.approveReport)


module.exports = router;