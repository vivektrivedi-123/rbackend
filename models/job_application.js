const mongoose = require("mongoose");
const location = require("./location");
const jobId = require("./job_form");
const formId = require("./job_form");
const jobapplication = new mongoose.Schema(
  {
    job: [
      { type: mongoose.Schema.Types.ObjectID, ref: "job_form", required: true },
    ],
    form: [
      { type: mongoose.Schema.Types.ObjectID, ref: "job_form", required: true },
    ],
    form_values: { type: Number, required: true },
    resume: { type: String, required: true },
    origin: { type: String, required: true },
    tags: { type: String, required: true },
    status: { type: String, required: true },
    overall_rating: { type: Number, required: true },
    location: [
      { type: mongoose.Schema.Types.ObjectID, ref: "location", required: true },
    ],
    lead_owner: { type: String, required: true },
    is_deleted: { type: Boolean, required: true },
    is_blocked: { type: Boolean, required: true },
    social_profiles: { type: String, required: true },
    refer_by: { type: String, required: true },
    add_to_talent_pool: { type: String, required: true },
    created_by: { type: String, required: true },
    modified_by: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("jobapplication", jobapplication);
