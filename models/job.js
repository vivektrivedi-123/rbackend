const mongoose = require("mongoose");
const dept = require("./department");
const category = require("./category");
const location = require("./location");
const jobSchema = new mongoose.Schema(
  {
    department: [
      { type: mongoose.Schema.Types.ObjectId, ref: "dept", required: true },
    ],
    category: [
      { type: mongoose.Schema.Types.ObjectId, ref: "category", required: true },
    ],
    stages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "stageData",
        required: true,
      },
    ],

    job_title: { type: String, required: true },
    job_type: { type: String, required: true },
    skills: { type: String, required: true },
    branch: { type: String, required: true },
    remote_job: { type: Boolean, required: true },
    job_description: { type: String, required: true },
    experience: { type: String, required: true },
    min_sal: { type: Number, required: true },
    max_sal: { type: Number, required: true },
    currency: { type: String, required: true },
    allow_employees: { type: Boolean, required: true },
    publish: { type: Boolean, required: true },
    created_by: { type: String },
    modified_by: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("job", jobSchema);
