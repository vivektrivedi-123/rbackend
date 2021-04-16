const mongoose = require("mongoose");
const location = require("./location");
const category = new mongoose.Schema(
  {
    location: [
      { type: mongoose.Schema.Types.ObjectId, ref: "location", required: true },
    ],
    category: { type: String, required: true },
    status: { type: String, required: true },
    created_by: { type: String, required: true },
    modified_by: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("category", category);
