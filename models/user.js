const mongoose = require("mongoose");
const validator = require("mongoose-validator");
const company = require("./company");
const role = require("./role");
const user = new mongoose.Schema(
  {
    user_id: { type: Number, required: true },
    company_id: [
      { type: mongoose.Schema.Types.ObjectID, ref: company, required: true },
    ],
    role_id: [
      { type: mongoose.Schema.Types.ObjectID, ref: role, required: true },
    ],
    first_name: { type: String, required: true, minlength: 3, maxlength: 100 },
    last_name: { type: String, required: true, minlength: 3, maxlength: 100 },
    mobile_number: {
      type: Number,
      required: true,
      minlength: 10,
      maxlength: 10,
    },
    email: { type: String, required: true },
    password: { type: String, required: true, minLength: 5, null: false },
    token: { type: String, required: true },
    profile_image: { type: String, required: true },
    created_by: { type: String, required: true },
    modified_by: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", user);
