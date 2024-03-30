let express = require('express');
let router = express.Router();
const ReportsController = require("../controllers/reports_controller");

/* POST */

router.post('/', ReportsController.registerReport);

module.exports = router;