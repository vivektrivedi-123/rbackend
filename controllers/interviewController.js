const Interview = require("../models/job_app_interview");
const mongoose = require("mongoose");
const _ = require("lodash");
exports.getInterview = async (req, res, next) => {
  Interview.find()
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
exports.getInterviewById = async (req, res, next) => {
  Interview.findById({ _id: req.params.id })
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
exports.addInterview = async (req, res, next) => {
  let interviews = new Interview(
    _.pick(req.body, [
      "job",
      "location",
      "application",
      "stage",
      "subject",
      "schedule_date",
      "schedule_time",
      "schedule_timezone",
      "duration",
      "recommendations",
      "interviewer",
      "rating",
      "notes",
      "overall_comments",
      "status",
      "created_by",
      "modified_by",
    ])
  );

  interviews
    .save()
    .then((doc) => {
      res.status(200).json({
        message: "Interview Added Successfully",
        results: doc,
      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
exports.updateInterview = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  Interview.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  let update = await Interview.findByIdAndUpdate(
    { _id: req.params.id },
    req.body
  );
  res.status(200).json(update);
};

exports.deleteInterview = async (req, res, next) => {
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid request");
  Interview.findByIdAndRemove({ _id: req.params.id })
    .then((doc) => {
      res.status(200).json({
        message: "Interview Deleted Successfully",
      });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
