const mongoose = require("mongoose");
const companyid = require("./company");
const company = new mongoose.Schema(
  {
    location_id: { type: Number, required: true },
    company_id: [
      { type: mongoose.Types.ObjectID, ref: companyid, required: true },
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
module.exports = mongoose.model("comp", company);
