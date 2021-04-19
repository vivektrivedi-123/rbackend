const Application = require("../models/application");
const mongoose = require("mongoose");
const _ = require("lodash");
const job = require("../models/post");
const form = require("../models/form");
const location = require("../models/location");

//const PER_PAGE = 5;
exports.getApplication = async (req, res, next) => {
  Application.find()
    .populate("job")
    .populate("form")
    .populate({
      path: "location",
      populate: { path: "company" },
    })
    // .skip(PER_PAGE * page - PER_PAGE)
    // .limit(PER_PAGE)
    .exec()
    .then((data) => {
      res.status(200).json({
        results: data,
      });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

exports.getApplicationById = async (req, res, next) => {
  Application.findById({ _id: req.params.id })
    .populate("job")
    .populate("form")
    .populate({
      path: "location",
      populate: { path: "company" },
    })
    // .skip(PER_PAGE * page - PER_PAGE)
    // .limit(PER_PAGE)
    .exec()
    .then((data) => {
      res.status(200).json({
        message: "OK",
        results: data,
      });
    })
    .catch((err) => {
      res.json(err);
    });
};
exports.addApplication = async (req, res, next) => {
  let applications = new Application(
    _.pick(req.body, [
      "job",
      "form",
      "form_values",
      "resume",
      "origin",
      "tags",
      "status",
      "overall_rating",
      "location",
      "lead_owner",
      "is_deleted",
      "is_blocked",
      "social_profiles",
      "refer_by",
      "add_to_talent_pool",
      "created_by",
      "modified_by",
    ])
  );
  applications
    .save()

    .then((doc) => {
      res.status(200).json({
        message: "Application Added Successfully",
        results: doc,
      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
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
  res.json({ message: "Application Updated" }).status(200);
};

exports.deleteApplication = async (req, res, next) => {
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid request");
  Application.findByIdAndRemove({ _id: req.params.id })
    .then((doc) => {
      res.status(200).json({
        message: "Application Deleted Successfully",
      });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
