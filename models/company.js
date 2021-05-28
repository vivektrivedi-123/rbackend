const mongoose = require("mongoose");
const companySchema = new mongoose.Schema(
  {
    company_name: { type: String, required: true ,min: 3, max: 60 },
    industry: { type: String, required: true,min: 3, max: 50  },
    company_language: { type: String, required: true },
    date_format: { type: String, required: true },
    employee_portal_name: { type: String, required: true,min: 3, max: 50  },
    employee_portal_url: { type: String, required: true },
    company_logo: { type: String, required: true },
    favicon: { type: String, required: true },
    created_by: { type: String },
    modified_by: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("company", companySchema);
