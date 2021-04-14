const mongoose = require("mongoose");
const department = require("./department");
const jobId = require("./job_form");
const category = require("./job_category");
const location = require("./location");
const jobposting = new mongoose.Schema(
  {
    job: [
      { type: mongoose.Schema.Types.ObjectID, ref: "job_form", required: true },
    ],
    department: [
      {
        type: mongoose.Schema.Types.ObjectID,
        ref: "department",
        required: true,
      },
    ],
    category: [
      {
        type: mongoose.Schema.Types.ObjectID,
        ref: "job_category",
        required: true,
      },
    ],
    job_title: { type: String, required: true },
    job_type: { type: String, required: true },
    location: [
      { type: mongoose.Schema.Types.ObjectID, ref: "location", required: true },
    ],
    remote_job: { type: String, required: true },
    job_description: { type: String, required: true },
    experience: { type: String, required: true },
    skills: { type: String, required: true },
    tags: { type: String, required: true },
    min_sal: { type: Number, required: true },
    max_sal: { type: Number, required: true },
    currency: { type: Number, required: true },
    allow_employees: { type: String, required: true },
    status: { type: String, required: true },
    job_code: { type: Number, required: true },
    job_slug: { type: String, required: true },
    created_by: { type: String, required: true },
    modified_by: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("jobposting", jobposting);
