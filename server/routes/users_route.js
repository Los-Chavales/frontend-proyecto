let express = require('express');
let router = express.Router();
const { login, logout, register, verifyToken, viewUsers, test, testAdmin } = require("../controllers/users_controller.js");
const { auth, authAdmin } = require("../middlewares/validate_token.js");


router.post("/register", register);
router.post("/login", login);
router.get("/verify", verifyToken);
router.post("/logout", logout);
router.get("/users", authAdmin, viewUsers);
router.get("/test", auth, test);
router.get("/testAdmin", authAdmin, testAdmin);

module.exports = router;