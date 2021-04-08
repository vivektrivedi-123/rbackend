const mongoose = require("mongoose");
//const user = require("./company_users");
const role = new mongoose.Schema({
  role_id: { type: Number, required: true },
  role_name: { type: String, required: true },
});
module.exports = mongoose.model("role", role);
