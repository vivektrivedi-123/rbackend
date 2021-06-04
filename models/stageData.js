const mongoose = require("mongoose");
const stageDataSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    stageData: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "stages",
        required: true,
      },
    ],
    created_by: { type: String },
    modified_by: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("stageData", stageDataSchema);
