const mongoose = require("mongoose");

const role = new mongoose.Schema({
  role_name: { type: String, required: true },
});
module.exports = mongoose.model("role", role);
