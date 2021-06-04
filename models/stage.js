const mongoose = require("mongoose");
const location = require("./location");
const job = require("./job");
const stageSchema = new mongoose.Schema(
  {
    job: [{ type: mongoose.Schema.Types.ObjectId, ref: "job", required: true }],
    stage: { type: Number, required: true, default: 1 },
    stepName: { type: String, required: true, default: "Open" },
    order: { type: Number, required: true, default: 1 },
    created_by: { type: String },
    modified_by: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("stages", stageSchema);
