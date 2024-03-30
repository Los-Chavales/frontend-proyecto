require("dotenv").config(); 
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json());

let contact_form = require("./routes/reports_route");

app.use("/report", contact_form);

/* conexión a la base de datos */

mongoose.connect(process.env.DB_URI)
  .then(() =>{
    console.log("Conexión exitosa")
    app.listen(4000,()=>{
      console.log("Servidor corriendo en el puerto 4000")
    })
  })
  .catch((err) => console.log("Conexión fallida"));