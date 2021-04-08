const mongoose = require("mongoose");
const department = require("./department");
const jobid = require("./job_form");
const location = require("./location");
const jobposting = new mongoose.Schema(
  {
    job_id: { type: Schema.Types.ObjectID, ref: jobid, required: true },
    department_id: [
      { type: mongoose.Types.ObjectID, ref: department, required: true },
    ],
    category_id: [
      { type: mongoose.Types.ObjectID, ref: department, required: true },
    ],
    job_title: [
      { type: mongoose.Types.ObjectID, ref: department, required: true },
    ],
    job_type: [
      { type: mongoose.Types.ObjectID, ref: department, required: true },
    ],
    location_id: [
      { type: mongoose.Types.ObjectID, ref: location, required: true },
    ],
    remote_job: { type: String, required: true },
    job_description: [
      { type: mongoose.Types.ObjectID, ref: jobid, required: true },
    ],
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
