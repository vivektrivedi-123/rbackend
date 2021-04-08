const mongoose = require("mongoose");
const location = require("./location");
const jobappcomments = new mongoose.Schema(
  {
    comment_id: { type: Number, required: true },
    application_id: { type: Number, required: true },
    location_id: [
      { type: mongoose.Types.ObjectID, ref: location, required: true },
    ],
    comments: { type: String, required: true },
    attachments: { type: Image, required: true },
    status: { type: String, required: true },
    created_by: { type: String, required: true },
    modified_by: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("jobappcomments", jobappcomments);
