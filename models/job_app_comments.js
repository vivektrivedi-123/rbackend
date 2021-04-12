const mongoose = require("mongoose");
const location = require("./location");
const application = require("./job_application");
const jobcomments = new mongoose.Schema(
  {
    comment_id: { type: Number },
    application_id: [
      {
        type: mongoose.Schema.Types.ObjectID,
        ref: application,
        required: true,
      },
    ],
    location_id: [
      { type: mongoose.Schema.Types.ObjectID, ref: location, required: true },
    ],
    comments: { type: String, required: true },
    attachments: { type: String, required: true },
    status: { type: String, required: true },
    created_by: { type: String, required: true },
    modified_by: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("jobcomments", jobcomments);
