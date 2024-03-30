const mongoose = require("mongoose");

const ReportsSchema = mongoose.Schema({
  name:{
    type: String,
    require: true,
    trim: true
  },
  email:{
    type: String,
    require: true,
    trim: true
  },
  date_sighting:{
    type: Date,
    require: true,
  },
  phone:{
    type: String,
    require: true,
    trim: true
  },
  state:{
    type: String,
    require: true
  },
  number_sighting:{
    type: Number,
    require: true
  }
});

module.exports = mongoose.model("reports", ReportsSchema);