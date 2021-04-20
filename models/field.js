const mongoose = require("mongoose");
const location = require("./location");
const fieldSchema = new mongoose.Schema(
  {
    location: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "location",
        required: true,
      },
    ],

    field_name: { type: String, required: true },
    field_type: { type: String, required: true },
    field_options: { type: String, required: true },
    created_by: { type: String },
    modified_by: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("field", fieldSchema);
