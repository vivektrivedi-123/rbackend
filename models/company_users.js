const mongoose = require("mongoose");
const company = require("./company");
const role = require("./role");
const comp_user = new mongoose.Schema(
  {
    user_id: { type: Number, required: true },
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
    password: { type: String, required: true, minLength: 5, null: false },
    token: { type: String, required: true },
    profile_image: { type: String, required: true },
    created_by: { type: String, required: true },
    modified_by: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("compUser", comp_user);
