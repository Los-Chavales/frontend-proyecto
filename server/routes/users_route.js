let express = require('express');
let router = express.Router();
const { login, logout, register, verifyToken, viewUsers, updateUsers, deleteUsers, test, testAdmin } = require("../controllers/users_controller.js");
const { auth, authAdmin, authRoot } = require("../middlewares/validate_token.js");


router.post("/register", register);
router.post("/login", login);
router.get("/verify", verifyToken);
router.post("/logout", logout);
router.get("/users", authRoot, viewUsers);
router.post("/update", authRoot, updateUsers);
router.post("/delete", authRoot, deleteUsers);
router.get("/test", auth, test);
router.get("/testAdmin", authRoot, testAdmin);

module.exports = router;