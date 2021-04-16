const mongoose = require("mongoose");
const form = require("./form");
const stages = require("./stages");
const application = require("./application");
const location = require("./location");

const interview = new mongoose.Schema(
  {
    interview: { type: Number, required: true },
    job: [
      { type: mongoose.Schema.Types.ObjectId, ref: "form", required: true },
    ],
    location: [
      { type: mongoose.Schema.Types.ObjectId, ref: "location", required: true },
    ],
    application: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "application",
        required: true,
      },
    ],
    stage: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "stages",
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

module.exports = mongoose.model("interview", interview);
