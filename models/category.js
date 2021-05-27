const mongoose = require("mongoose");
const location = require("./location");
const categorySchema = new mongoose.Schema(
  {
    location: [
      { type: mongoose.Schema.Types.ObjectId, ref: "location", required: true },
    ],
    category: { type: String, required: true ,min: 3, max: 50 },
    status: { type: String, required: true,min: 5, max: 20  },
    created_by: { type: String },
    modified_by: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("category", categorySchema);
