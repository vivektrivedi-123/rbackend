const mongoose = require("mongoose");
const companySchema = new mongoose.Schema(
  {
    company_name: { type: String, required: true },
    industry: { type: String, required: true },
    company_language: { type: String, required: true },
    date_format: { type: String, required: true },
    employee_portal_name: { type: String, required: true },
    employee_portal_url: { type: String, required: true },
    company_logo: { type: String, required: true },
    change_favicon: { type: String, required: true },
    created_by: { type: String },
    modified_by: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("company", companySchema);
