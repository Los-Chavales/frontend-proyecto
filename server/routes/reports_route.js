let express = require('express');
let router = express.Router();
const ReportsController = require("../controllers/reports_controller");
const upload = require("../middlewares/storage")
const { auth } = require("../middlewares/validate_token.js");


/* GET */
router.get("/", auth, ReportsController.showReports);

/* POST */
router.post('/register', upload.single("image"), ReportsController.registerReport);

router.post('/approve', auth, ReportsController.approveReport)

/* GET */

/*router.get('/watch', ReportsController.showReports); */

module.exports = router;