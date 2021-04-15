const mongoose = require("mongoose");
const location = require("./location");
const dept = new mongoose.Schema(
  {
    location: [
      { type: mongoose.Schema.Types.ObjectId, ref: "location", required: true },
    ],
    department_name: { type: String, required: true },
    created_by: { type: String, required: true },
    modified_by: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("dept", dept);
