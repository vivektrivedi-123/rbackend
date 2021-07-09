const mongoose = require("mongoose");
const fs = require("fs");
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
    stage: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "stageData",
        required: true,
      },
    ],
    first_name: { type: String, required: true, trim: true, min: 3, max: 30 },
    last_name: { type: String, required: true, min: 3, max: 30 },
    mobile_number: { type: Number, required: true, length: 10,unique:true },
    email: { type: String, required: true },
    password: { type: String, required: true, min: 8, max: 20 },
    profile_image: { type: String, required: true },

    created_by: { type: String },
    modified_by: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("user", userSchema);
