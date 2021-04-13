const mongoose = require("mongoose");
const company = require("./company");
const role = require("./role");
const user = new mongoose.Schema(
  {
    company_id: [
      { type: mongoose.Schema.Types.ObjectID, ref: company, required: true },
    ],
    role_id: [
      { type: mongoose.Schema.Types.ObjectID, ref: role, required: true },
    ],
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    mobile_number: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String },
    profile_image: { type: String, required: true },
    created_by: { type: String, required: true },
    modified_by: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("user", user);
