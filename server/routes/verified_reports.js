let express = require('express');
let router = express.Router();
const ReportsVController = require("../controllers/verified_register_controller.js");
const { auth, authAdmin } = require("../middlewares/validate_token.js");


router.post("/register", auth, ReportsVController.registerReport);

module.exports = router;