const mongoose = require("mongoose");
const companySchema = new mongoose.Schema(
  {
    company_name: { type: String, required: true },
    company_slug: { type: String, required: true },
    company_logo: { type: String, required: true },
    industry_type: { type: String, required: true },
    created_by: { type: String },
    modified_by: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("company", companySchema);
