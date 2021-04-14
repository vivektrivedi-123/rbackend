const mongoose = require("mongoose");
const field = require("./field");
const location = require("./location");
const jobPost = require("./job_posting");
const jobForm = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "job_posting",
      required: true,
    },
    field: [
      { type: mongoose.Schema.Types.ObjectID, ref: "field", required: true },
    ],
    label: { type: String, required: true },
    placeholder: { type: String, required: true },
    is_required: { type: Boolean, required: true },
    order: { type: String, required: true },
    location: [
      { type: mongoose.Schema.Types.ObjectID, ref: "location", required: true },
    ],
    created_by: { type: String, required: true },
    modified_by: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("jobForm", jobForm);
