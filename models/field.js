const mongoose = require("mongoose");
const location = require("./location");
const field = new mongoose.Schema(
  {
    location_address: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "location",
        required: true,
      },
    ],

    field_name: { type: String, required: true },
    field_type: { type: String, required: true },
    field_options: { type: String, required: true },
    created_by: { type: String, required: true },
    modified_by: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("field", field);
