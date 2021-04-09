const Interview = require("../models/job_app_interview");
const mongoose = require("mongoose");
const _ = require("lodash");
exports.getInterview = async (req, res, next) => {
  let interview = await Interview.find();
  if (!interview) {
    res.status(404);
  } else {
    res.send(interview);
  }
};
exports.getInterviewByID = async (req, res, next) => {
  let interview = await Interview.findById({ _id: req.params.id });
  if (!interview) {
    res.status(400);
  } else {
    res.send(interview);
  }
};
exports.addInterview = async (req, res, next) => {
  let interview = await Interview.findOne({
    interview_id: req.body.interview_id,
  });
  if (interview) {
    res.status(409);
  } else {
    let interviews = new Interview(
      _.pick(req.body, [
        "Interview_id",
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
    await interviews.save();
    res.send("Registered");
  }
};
exports.updateInterview = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0) res.status(400);
  Interview.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400);
  });
  let update = await Interview.findByIdAndUpdate(
    { _id: req.params.id },
    req.body
  );
  res.json(update);
};

exports.deleteInterview = async (req, res, next) => {
  let id = await req.params.id;
  if (!req.params.id || req.params.id < 0) res.status(400);
  Interview.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400);
  });
  Interview.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.deletedCount > 0) {
      res.status(200);
    } else {
      res.status(401);
    }
  });
};
