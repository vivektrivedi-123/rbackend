const mongoose = require("mongoose");
const jobApplication = require("./job_application");
const location = require("./location");

const jobEmail = new mongoose.Schema(
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
    from: { type: String, required: true },
    to: { type: String, required: true },
    body: { type: String, required: true },
    status: { type: String, required: true },
    created_by: { type: String, required: true },
    modified_by: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("jobEmail", jobEmail);
