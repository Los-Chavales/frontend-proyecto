const multer  = require("multer")

const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null,"uploads/");  //Guardarlo en la carpeta public
  }, 
  filename: (req,file,cb) => {
    cb(null, Date.now() + file.originalname);  //Guardar el nombre del archivo con la fecha para evitar duplicados
  } 
})

const upload = multer({ storage: storage });

module.exports = upload;