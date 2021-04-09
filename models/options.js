const mongoose = require("mongoose");
const location = require("./location");
const options = new mongoose.Schema(
  {
    option_id: { type: Number, required: true },
    option_key: { type: Number, required: true },
    option_value: { type: Number, required: true },
    location_id: [
      { type: mongoose.Types.ObjectID, ref: location, required: true },
    ],
    field_name: { type: String, required: true },
    created_by: { type: String, required: true },
    modified_by: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("options", options);
