const mongoose = require("mongoose");
const stage = require("./stage");
const company = require("./company");
const job = require("./job");
const candidateSchema = new mongoose.Schema(
  {
    candidate_name: { type: String, required: true, min: 3, max: 30 },
    applied_for: { type: String, required: true, min: 3, max: 30 },
    owner: { type: String, required: true, length: 20 },
    applied_date: { type: String, required: true },
    star: { type: String, required: true },
    stage: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "stageData",
        required: true,
      },
    ],
    job: [{ type: mongoose.Schema.Types.ObjectId, ref: "job", required: true }],
    created_by: { type: String },
    modified_by: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("candidate", candidateSchema);
