const mongoose = require("mongoose");
const jobApp = require("./job_application");
const location = require("./location");

const jobemail = new mongoose.Schema(
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
    from: { type: String, required: true },
    to: { type: String, required: true },
    body: { type: String, required: true },
    status: { type: String, required: true },
    created_by: { type: String, required: true },
    modified_by: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("jobemail", jobemail);
