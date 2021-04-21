const mongoose = require("mongoose");
const location = require("./location");
const form = require("./form");
const job = require("./job");
const applicationSchema = new mongoose.Schema(
  {
    job: [{ type: mongoose.Schema.Types.ObjectId, ref: "job", required: true }],
    form: [
      { type: mongoose.Schema.Types.ObjectId, ref: "form", required: true },
    ],
    form_values: { type: Number, required: true },
    resume: { type: String, required: true },
    origin: { type: String, required: true },
    tags: { type: String, required: true },
    status: { type: String, required: true },
    overall_rating: { type: Number, required: true },
    lead_owner: { type: String, required: true },
    is_deleted: { type: Boolean, required: true },
    is_blocked: { type: Boolean, required: true },
    social_profiles: { type: String, required: true },
    refer_by: { type: String, required: true },
    add_to_talent_pool: { type: String, required: true },
    created_by: { type: String },
    modified_by: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("application", applicationSchema);