const mongoose = require("mongoose");
const jobapp = require("./job_application");
const location = require("./location");

const jobappemail = new mongoose.Schema(
  {
    application_email_id: { type: Number, required: true },
    application_id: [
      { type: mongoose.Types.ObjectID, ref: jobapp, required: true },
    ],
    location_id: [
      { type: mongoose.Types.ObjectID, ref: location, required: true },
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

module.exports = mongoose.model("jobappemail", jobappemail);
