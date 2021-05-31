const mongoose = require("mongoose");
const location = require("./location");
const job = require("./job");
const stageSchema = new mongoose.Schema(
  {
    job: [{ type: mongoose.Schema.Types.ObjectId, ref: "job", required: true }],
    stage: { type: String, required: true },
    steps: { type: Array, required: true },
    created_by: { type: String },
    modified_by: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("stages", stageSchema);
