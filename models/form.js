const mongoose = require("mongoose");
const field = require("./field");
const location = require("./location");
const job = require("./job");
const formSchema = new mongoose.Schema(
  {
    job: [{ type: mongoose.Schema.Types.ObjectId, ref: "job", required: true }],
    field: [
      { type: mongoose.Schema.Types.ObjectId, ref: "field", required: true },
    ],
    label: { type: String, required: true },
    placeholder: { type: String, required: true },
    is_required: { type: Boolean, required: true },
    order: { type: String, required: true },
    created_by: { type: String },
    modified_by: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("form ", formSchema);
