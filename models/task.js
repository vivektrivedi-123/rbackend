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
    title: { type: String, required: true , min: 5, max: 30 },
    description: { type: String, required: true , min: 5, max: 60 },
    assigned_to: { type: String, required: true , min: 3, max: 30 },
    due_date: { type: String, required: true },
    due_time: { type: String, required: true },
    remind_before: { type: String, required: true },
    status: { type: String, required: true, min: 3, max: 30  },
    created_by: { type: String },
    modified_by: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("task", taskSchema);
