const mongoose = require("mongoose");
const application = require("./application");
const location = require("./location");

const emailSchema = new mongoose.Schema(
  {
    application: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "application",
        required: true,
      },
    ],
    from: { type: String, required: true },
    to: { type: String, required: true },
    body: { type: String, required: true ,min: 5, max: 100 },
    status: { type: String, required: true },
    created_by: { type: String },
    modified_by: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("email", emailSchema);
