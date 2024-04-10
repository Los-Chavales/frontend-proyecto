const mongoose = require("mongoose");

const VerifiedReportsSchema = mongoose.Schema({
  reported_name:{
    type: String,
    require: true,
    trim: true
  },
  date_sighting:{
    type: Date,
    require: true,
  },
  state:{
    type: String,
    require: true
  },
  description:{
    type: String,
    require: true,
    trim: true
  },
  photo:{
    type: String,
    require: true,
  }
});

module.exports = mongoose.model("verified_reports", VerifiedReportsSchema);