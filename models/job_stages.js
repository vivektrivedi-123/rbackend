const mongoose = require("mongoose");
const jobId = require("./job_form");
const location = require("./location");
const jobPost = require("./job_posting");
const jobStages = new mongoose.Schema(
  {
    location: [
      { type: mongoose.Schema.Types.ObjectID, ref: "location", required: true },
    ],
    job: [
      { type: mongoose.Schema.Types.ObjectID, ref: "job_form", required: true },
    ],
    stage: { type: String, required: true },
    status: [
      { type: mongoose.Schema.Types.ObjectID, ref: jobPost, required: true },
    ],
    created_by: { type: String, required: true },
    modified_by: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("jobStages", jobStages);
