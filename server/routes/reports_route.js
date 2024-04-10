let express = require('express');
let router = express.Router();
const ReportsController = require("../controllers/reports_controller");
const upload = require("../middlewares/storage")


/* GET */ 
router.get("/", ReportsController.showReports);

/* POST */
router.post('/register', upload.single("image"), ReportsController.registerReport);

 /* GET */

/*router.get('/watch', ReportsController.showReports); */

module.exports = router;