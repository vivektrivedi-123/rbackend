const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  role_name: { type: String, required: true , min: 3, max: 30 },
});
module.exports = mongoose.model("role", roleSchema);
