const mongoose = require("mongoose");
const location = require("./location");
const categorySchema = new mongoose.Schema(
  {
    location: [
      { type: mongoose.Schema.Types.ObjectId, ref: "location", required: true },
    ],
    category: { type: String, required: true },
    status: { type: String, required: true },
    created_by: { type: String },
    modified_by: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("category", categorySchema);