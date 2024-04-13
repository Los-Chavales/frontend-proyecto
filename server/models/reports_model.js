const mongoose = require("mongoose");

const ReportsSchema = mongoose.Schema({
  name:{
    type: String,
    require: true,
    trim: true,
  },
  reported_name:{
    type: String,
    require: true,
    trim: true,
  },
  id_notice: {
    type: String,
    require: false,
    trim: true,
  },
  email:{
    type: String,
    require: true,
    trim: true,
  },
  date_sighting:{
    type: Date,
    require: true,
  },
  phone:{
    type: String,
    require: true,
    trim: true,
  },
  state:{
    type: String,
    require: true,
  },
  status:{
    type: Boolean,
    default: 'false',
  },
  description:{
    type: String,
    require: true,
    trim: true,
  },
  photo:{
    type: String,
    require: true,
  }
});

module.exports = mongoose.model("reports", ReportsSchema);