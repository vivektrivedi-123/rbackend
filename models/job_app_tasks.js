const mongoose = require("mongoose");
const jobapp = require("./job_application");
const location = require("./location");

const jobapptasks = new mongoose.Schema(
  {
    application_task_id: { type: Number, required: true },
    application_id: [
      { type: mongoose.Types.ObjectID, ref: jobapp, required: true },
    ],
    location_id: [
      { type: mongoose.Types.ObjectID, ref: location, required: true },
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

module.exports = mongoose.model("jobapptasks", jobapptasks);
