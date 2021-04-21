const mongoose = require("mongoose");
const location = require("./location");
const application = require("./application");
const commentsSchema = new mongoose.Schema(
  {
    application: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "application",
        required: true,
      },
    ],

    comments: { type: String, required: true },
    attachments: { type: String, required: true },
    status: { type: Boolean, required: true },
    created_by: { type: String },
    modified_by: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("comments", commentsSchema);
