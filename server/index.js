require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(
  cors({
      origin: 'http://localhost:3000',
      credentials: true,
      optionSuccessStatus: 200,
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization'],
  })
)
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
})
app.use(express.json());
app.use(cookieParser());

let contact_form = require("./routes/reports_route");
let users_auth = require("./routes/users_route");

app.use("/report", contact_form);
app.use("/auth", users_auth);

/* conexión a la base de datos */

mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log("Conexión exitosa")
    app.listen(4001, () => {
      console.log("Servidor corriendo en el puerto 4000")
    })
  })
  .catch((err) => console.error("Conexión fallida", err));