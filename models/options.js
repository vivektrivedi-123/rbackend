const mongoose = require("mongoose");
const location = require("./location");
const optionsSchema = new mongoose.Schema(
  {
    option_key: { type: Number, required: true , min: 5, max: 20 },
    option_value: { type: Number, required: true , min: 5, max: 20 },
    location: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "location",
        required: true,
      },
    ],
    created_by: { type: String },
    modified_by: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("options", optionsSchema);
