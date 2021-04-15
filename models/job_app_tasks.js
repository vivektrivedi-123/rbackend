const mongoose = require("mongoose");
const jobApplication = require("./job_application");
const location = require("./location");

const jobTasks = new mongoose.Schema(
  {
    application: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "jobApplication",
        required: true,
      },
    ],
    location: [
      { type: mongoose.Schema.Types.ObjectId, ref: "location", required: true },
    ],
    title: { type: String, required: true },
    description: { type: String, required: true },
    assigned_to: { type: String, required: true },
    due_date: { type: Date, required: true },
    due_time: { type: String, required: true },
    remind_before: { type: String, required: true },
    status: { type: String, required: true },
    created_by: { type: String, required: true },
    modified_by: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("jobTasks", jobTasks);
