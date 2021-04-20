const mongoose = require("mongoose");
const company = require("./company");
const role = require("./role");
const userSchema = new mongoose.Schema(
  {
    company: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "company",
        required: true,
      },
    ],

    role: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "role",
        required: true,
      },
    ],

    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true },
    mobile_number: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profile_image: { data: Buffer, contentType: String },
    created_by: { type: String },
    modified_by: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("user", userSchema);
