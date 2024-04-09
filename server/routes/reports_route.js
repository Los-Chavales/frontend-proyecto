let express = require('express');
let router = express.Router();
const ReportsController = require("../controllers/reports_controller");
const upload = require("../middlewares/storage")


/* GET */ 
router.get("/", ReportsController.showReports);

/* POST */
router.post('/', upload.single("image"), ReportsController.registerReport);

module.exports = router;