const mongoose = require("mongoose");
const jobForm = require("./job_form");
const location = require("./location");
const jobPosting = require("./job_posting");
const jobStages = new mongoose.Schema(
  {
    location: [
      { type: mongoose.Schema.Types.ObjectId, ref: "location", required: true },
    ],
    job: [
      { type: mongoose.Schema.Types.ObjectId, ref: "jobForm", required: true },
    ],
    stage: { type: String, required: true },
    status: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "jobPosting",
        required: true,
      },
    ],
    created_by: { type: String, required: true },
    modified_by: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("jobStages", jobStages);
