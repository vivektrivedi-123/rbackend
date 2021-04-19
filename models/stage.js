const mongoose = require("mongoose");
const location = require("./location");
const post = require("./post");
const stage = new mongoose.Schema(
  {
    location: [
      { type: mongoose.Schema.Types.ObjectId, ref: "location", required: true },
    ],
    job: [
      { type: mongoose.Schema.Types.ObjectId, ref: "post", required: true },
    ],
    stage: { type: String, required: true },
    status: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        required: true,
      },
    ],
    created_by: { type: String, required: true },
    modified_by: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("stage", stage);
