const mongoose = require("mongoose");
const company = require("./company");
const locationSchema = new mongoose.Schema(
  {
    company: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "company",
        required: true,
      },
    ],
    location_address: { type: String, required: true },
    location_street: { type: String, required: true },
    location_city: { type: String, required: true },
    location_state: { type: String, required: true },
    postal_code: { type: Number, required: true },
    country_id: { type: Number, required: true },
    website: { type: String, required: true },
    contact: { type: Number, required: true },
    created_by: { type: String },
    modified_by: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("location", locationSchema);
