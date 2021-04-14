const mongoose = require("mongoose");
const location = require("./location");
const application = require("./job_application");
const jobcomments = new mongoose.Schema(
  {
    application: [
      {
        type: mongoose.Schema.Types.ObjectID,
        ref: "job_application",
        required: true,
      },
    ],
    location: [
      { type: mongoose.Schema.Types.ObjectID, ref: "location", required: true },
    ],
    comments: { type: String, required: true },
    attachments: { type: String, required: true },
    status: { type: Boolean, required: true },
    created_by: { type: String, required: true },
    modified_by: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("jobcomments", jobcomments);
