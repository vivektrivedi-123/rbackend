const mongoose = require("mongoose");
const field = require("./field");
const location = require("./location");
const jobForm = new mongoose.Schema(
  {
    form_id: { type: Number, required: true },
    job_id: { type: Number, required: true },
    field_id: [
      { type: mongoose.Schema.Types.ObjectID, ref: field, required: true },
    ],
    label: { type: String, required: true },
    placeholder: { type: String, required: true },
    is_required: { type: Boolean, required: true },
    order: { type: String, required: true },
    location_id: [
      { type: mongoose.Schema.Types.ObjectID, ref: location, required: true },
    ],
    category: { type: String, required: true },
    status: { type: String, required: true },
    created_by: { type: String, required: true },
    modified_by: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("jobForm", jobForm);
