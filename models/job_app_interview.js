const mongoose = require("mongoose");
const jobid = require("./job_form");
const stage = require("./job_stages");
const jobapp = require("./job_application");
const location = require("./location");

const jobinterview = new mongoose.Schema(
  {
    interview_id: { type: Number, required: true },
    job_id: [{ type: mongoose.Types.ObjectID, ref: jobid, required: true }],
    location_id: [
      { type: mongoose.Types.ObjectID, ref: location, required: true },
    ],
    application_id: [
      { type: mongoose.Types.ObjectID, ref: jobapp, required: true },
    ],
    stage_id: [{ type: mongoose.Types.ObjectID, ref: stage, required: true }],
    subject: { type: String, required: true },
    scheduled_date: { type: Date, required: true },
    scheduled_time: { type: String, required: true },
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

module.exports = mongoose.model("jobinterview", jobinterview);
