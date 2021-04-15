const mongoose = require("mongoose");
const jobForm = require("./job_form");
const jobStages = require("./job_stages");
const jobApplication = require("./job_application");
const location = require("./location");

const jobInterview = new mongoose.Schema(
  {
    interview: { type: Number, required: true },
    job: [
      { type: mongoose.Schema.Types.ObjectId, ref: "jobForm", required: true },
    ],
    location: [
      { type: mongoose.Schema.Types.ObjectId, ref: "location", required: true },
    ],
    application: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "jobApplication",
        required: true,
      },
    ],
    stage: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "jobStages",
        required: true,
      },
    ],
    subject: { type: String, required: true },
    scheduled_date: { type: Date, required: true },
    scheduled_time: { type: Date, required: true },
    scheduled_timezone: { type: String, required: true },
    duration: { type: Number, required: true },
    recommendations: { type: String, required: true },
    interviewer: { type: String, required: true },
    rating: { type: Number, required: true },
    notes: { type: String, required: true },
    overall_comments: { type: String, required: true },
    status: { type: String, required: true },
    created_by: { type: String, required: true },
    modified_by: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("jobInterview", jobInterview);
