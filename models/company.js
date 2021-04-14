const mongoose = require("mongoose");
const company = new mongoose.Schema(
  {
    company_name: { type: String, required: true },
    company_slug: { type: String, required: true },
    company_logo: { type: String, required: true },
    industry_type: { type: String, required: true },
    created_by: { type: String, required: true },
    modified_by: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("company", company);
