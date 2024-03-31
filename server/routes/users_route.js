let express = require('express');
let router = express.Router();
const { login, logout, register, verifyToken, test } = require("../controllers/users_controller.js");
const validate = require("../middlewares/validate_token.js");


router.post("/register", register);
router.post("/login", login);
router.get("/verify", verifyToken);
router.post("/logout", logout);
router.get("/test", validate, test);

module.exports = router;