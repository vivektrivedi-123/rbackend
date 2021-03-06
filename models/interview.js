const mongoose = require("mongoose");
const job = require("./job");
const stage = require("./stage");
const application = require("./application");
const location = require("./location");

const interviewSchema = new mongoose.Schema(
  {
    application: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "application",
        required: true,
      },
    ],
    stages: [
      { type: mongoose.Schema.Types.ObjectId, ref: "stages", required: true },
    ],
    subject: { type: String, required: true },
    scheduled_date: { type: String, required: true },
    scheduled_time: { type: String, required: true },
    scheduled_timezone: { type: String, required: true },
    duration: { type: String, required: true,min: 5, max: 30  },
    recommendations: { type: String, required: true,min: 3, max: 50  },
    interviewer: { type: String, required: true ,min: 5, max: 30 },
    rating: { type: Number, required: true },
    notes: { type: String, required: true ,min: 5, max: 80 },
    overall_comments: { type: String, required: true },
    status: { type: String, required: true },
    created_by: { type: String },
    modified_by: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("interview", interviewSchema);
