const mongoose = require("mongoose");
const application = require("./application");
const location = require("./location");

const taskSchema = new mongoose.Schema(
  {
    application: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "application",
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
    created_by: { type: String },
    modified_by: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("task", taskSchema);
