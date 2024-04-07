const jwt = require("jsonwebtoken");
require("dotenv").config();
const TOKEN_SECRET = process.env.TOKEN_SECRET;

const auth = (req, res, next) => {
  try {
    const { token } = req.cookies;
    //console.log("Validar token: ", token);
    if (!token) return res.status(401).json({ message: "Sin token, autorización denegada" });

    jwt.verify(token, TOKEN_SECRET, (error, user) => {
      if (error) return res.status(401).json({ message: "Token inválido" });
      console.log("Validar token: ", user);
      req.user = user;//Guardar los datos del usuario para el controller
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const authAdmin = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "Sin token, autorización denegada" });

    jwt.verify(token, TOKEN_SECRET, (error, user) => {
      if (error) return res.status(401).json({ message: "Token inválido" });
      console.log("Validar token: ", user);
      if (user.role !== 'admin') return res.status(403).json({ message: "Usuario no autorizado" });
      req.user = user;//Guardar los datos del usuario para el controller
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { auth: auth, authAdmin: authAdmin };