const mongoose = require("mongoose");
const company = require("./company");
const location = new mongoose.Schema(
  {
    company: [
      { type: mongoose.Schema.Types.ObjectID, ref: "company", required: true },
    ],
    location_address: { type: String, required: true },
    location_street: { type: String, required: true },
    location_city: { type: String, required: true },
    location_state: { type: String, required: true },
    postal_code: { type: Number, required: true },
    country_id: { type: Number, required: true },
    website: { type: String, required: true },
    contact: { type: Number, required: true },
    created_by: { type: String, required: true },
    modified_by: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("location", location);
