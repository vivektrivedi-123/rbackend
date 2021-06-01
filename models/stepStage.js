const mongoose = require("mongoose");
const stepsStageSchema = new mongoose.Schema(
  {
    stepName: { type: String, required: true },
    order: { type: Number, required: true },
    created_by: { type: String },
    modified_by: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("stepStage", stepsStageSchema);
