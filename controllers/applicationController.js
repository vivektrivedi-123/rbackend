const Application = require("../models/job_application");
const mongoose = require("mongoose");
const _ = require("lodash");
exports.getApplication = async (req, res, next) => {
  let application = await Application.find();
  if (!application) {
    res.status(404).send("No Applications Found");
  } else {
    res.status(200).send(application);
  }
};
exports.getApplicationByID = async (req, res, next) => {
  let application = await Application.findById({ _id: req.params.id });
  if (!application) {
    res.status(404).send("No Applications Found");
  } else {
    res.status(200).send(application);
  }
};
exports.addApplication = async (req, res, next) => {
  let applications = new Application(
    _.pick(req.body, [
      "application_id",
      "job_id",
      "form_id",
      "form_values",
      "resume",
      "origin",
      "tags",
      "status",
      "overall_rating",
      "location_id",
      "loead_owner",
      "is_deleted",
      "is_blocked",
      "social_profiles",
      "refer_by",
      "add_to_talent_pool",
      "created_by",
      "modified_by",
    ])
  );
  await applications.save();
  res.status(200).send("Application Registered");
};
exports.updateApplication = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid request");
  Application.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null)
      res.status(400).send("ID in the body is not matching ID in the URL");
  });
  let update = await Application.findByIdAndUpdate(
    { _id: req.params.id },
    req.body
  );
  res.json(update).status(200);
};

exports.deleteApplication = async (req, res, next) => {
  let id = await req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  Application.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  Application.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.deletedCount > 0) {
      res.status(200).send({ message: `Deleted ${result.deletedCount} item.` });
    } else {
      res.status(404).send(`Delete failed `);
    }
  });
};
