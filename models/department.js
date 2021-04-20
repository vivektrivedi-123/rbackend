const mongoose = require("mongoose");
const location = require("./location");
const deptSchema = new mongoose.Schema(
  {
    location: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "location",
        required: true,
      },
    ],
    department_name: { type: String, required: true },
    created_by: { type: String },
    modified_by: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("dept", deptSchema);
