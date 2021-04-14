const mongoose = require("mongoose");
const location = require("./location");
const jobCategory = new mongoose.Schema(
  {
    location: [
      { type: mongoose.Schema.Types.ObjectID, ref: "location", required: true },
    ],
    category: { type: String, required: true },
    status: { type: String, required: true },
    created_by: { type: String, required: true },
    modified_by: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("jobCategory", jobCategory);
