const Interview = require("../models/job_app_interview");
const mongoose = require("mongoose");
const _ = require("lodash");
exports.getInterview = async (req, res, next) => {
  let interview = await Interview.find();
  if (!interview) {
    res.status(404).send("No Interview Found");
  } else {
    res.send(interview);
  }
};
exports.getInterviewByID = async (req, res, next) => {
  let interview = await Interview.findById({ _id: req.params.id });
  if (!interview) {
    res.status(404).send("No Interview Found");
  } else {
    res.status(200).send(interview);
  }
};
exports.addInterview = async (req, res, next) => {
  let location = await Location.findOne({
    scheduled_time: req.body.scheduled_time,
  });
  if (location) {
    res.status(409).send("Location Already Exists");
  } else {
    let interview = new Interview(
      _.pick(req.body, [
        "job_id",
        "location_id",
        "application_id",
        "stage_id",
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
  }
  await interview.save();
  res.status(200).send("Interview Added");
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
  let id = await req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  Interview.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  Interview.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.deletedCount > 0) {
      res.status(200).send({ message: `Deleted ${result.deletedCount} item.` });
    } else {
      res.status(404).send(`Delete failed `);
    }
  });
};
