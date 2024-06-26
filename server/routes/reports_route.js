let express = require('express');
let router = express.Router();
const ReportsController = require("../controllers/reports_controller");
const upload = require("../middlewares/storage")
const { auth, authAdmin } = require("../middlewares/validate_token.js");


/* GET */
router.get("/", authAdmin, ReportsController.showReports);

/* con datos de la api */
router.get("/coincidence_reports/:id", ReportsController.coincidenceReports);

/* registrados libremente */
router.get("/coincidence_reports_free", auth, ReportsController.coincidenceReportsFree);

/* POST */
router.post('/register', upload.single("image"), ReportsController.registerReport);

router.post('/approve', authAdmin, ReportsController.approveReport);

/* Delete */
router.post('/delete', authAdmin, ReportsController.deleteReport);


module.exports = router;