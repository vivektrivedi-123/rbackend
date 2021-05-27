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
    location_name: { type: String, required: true , min: 5, max: 50 },
    location_address: { type: String, required: true, min: 5, max: 50  },
    location_city: { type: String, required: true, min: 3, max: 25  },
    location_state: { type: String, required: true , min: 3, max: 50 },
    postal_code: { type: Number, required: true  },
    country: { type: String, required: true , min: 5, max: 50 },
    currency: { type: String, required: true },
    primary_language: { type: String, required: true },
    time_zone: { type: String, required: true },
    date_format: { type: String, required: true },
    created_by: { type: String },
    modified_by: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("location", locationSchema);
