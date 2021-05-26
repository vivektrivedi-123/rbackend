const Interview = require("../models/interview");
const mongoose = require("mongoose");
const _ = require("lodash");
const job = require("../models/job");
const application = require("../models/application");
const location = require("../models/location");
const stages = require("../models/stage");

exports.getInterview = async (req, res, next) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);
  Interview.find()
    .skip(skip)
    .limit(limit)
    .select(" -__v")
    .populate({
      path: "application",
      select: "-_id -__v",
      populate: {
        path: "job",
        select: "-_id -__v",
        populate: {
          path: "department",
          select: "-_id -__v",
          populate: {
            path: "location",
            select: "-_id -__v",
            populate: { path: "company", select: "-_id -__v" },
          },
        },
      },
    })
    .populate({
      path: "application",
      select: "-_id -__v",
      populate: {
        path: "job",
        select: "-_id -__v",
        populate: { path: "category", select: "-_id -__v -location" },
      },
    })
    .populate({
      path: "stages",
      select: "-_id -__v -job",
    })
    .populate({
      path: "application",
      select: "-_id -__v",
      populate: {
        path: "forms",
        select: "-_id -__v -job ",
        populate: { path: "field", select: "-_id -__v -location" },
      },
    })
    .then((data) => {
      res.status(200).json({
        results: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
};
exports.getInterviewById = async (req, res, next) => {
  Interview.findById({ _id: req.params.id })
    .select(" -__v")
    .populate({
      path: "application",
      select: "-_id -__v",
      populate: {
        path: "job",
        select: "-_id -__v",
        populate: {
          path: "department",
          select: "-_id -__v",
          populate: {
            path: "location",
            select: "-_id -__v",
            populate: { path: "company", select: "-_id -__v" },
          },
        },
      },
    })
    .populate({
      path: "application",
      select: "-_id -__v",
      populate: {
        path: "job",
        select: "-_id -__v",
        populate: { path: "category", select: "-_id -__v -location" },
      },
    })
    .populate({
      path: "stages",
      select: "-_id -__v -job",
    })
    .populate({
      path: "application",
      select: "-_id -__v",
      populate: {
        path: "forms",
        select: "-_id -__v -job ",
        populate: { path: "field", select: "-_id -__v -location" },
      },
    })
    .exec()
    .then((doc, err) => {
      if (doc)
        res.status(200).json({
          results: doc,
        }),
          elseif(err);
      {
        res.send("ID does not exists").status(404);
      }
    })

    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
};
exports.addInterview = async (req, res, next) => {
  let interview = new Interview(
    _.pick(req.body, [
      "application",
      "stages",
      "subject",
      "scheduled_date",
      "scheduled_time",
      "scheduled_timezone",
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
  interview
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
    req.body,
    { new: true }
  );
  await update.save();
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
