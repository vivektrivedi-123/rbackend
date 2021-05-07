const Job = require("../models/job");
const mongoose = require("mongoose");
const _ = require("lodash");
const department = require("../models/department");
const category = require("../models/category");
const location = require("../models/location");
const company = require("../models/company");
exports.getJob = async (req, res, next) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);
  Job.find()
    .skip(skip)
    .limit(limit)
    .select("-_id -__v")
    .populate({
      path: "department",
      select: "-_id -__v",
      populate: {
        path: "location ",
        select: "-_id -__v",
        populate: { path: "company", select: "-_id -__v" },
      },
    })
    .populate({
      path: "category",
      select: "-location -createdAt -updatedAt -_id -__v",
    })
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
exports.getJobById = async (req, res, next) => {
  Job.findById({ _id: req.params.id })
    .select("-_id -__v")
    .populate({
      path: "department",
      select: "-_id -__v",
      populate: {
        path: "location ",
        select: "-_id -__v",
        populate: { path: "company", select: "-_id -__v" },
      },
    })
    .populate({
      path: "category",
      select: "-location -createdAt -updatedAt -_id -__v",
    })
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
exports.addJob = async (req, res, next) => {
  // let job = await Job.findOne({ job_title: req.body.job_title });
  // if (job) {
  //   res.status(409).send("job Already Exists");
  // } else {
    let jobs = new Job(
      _.pick(req.body, [
        "department",
        "category",
        "job_title",
        "job_type",
        "remote_job",
        "job_description",
        "experience",
        "skills",
        "tags",
        "min_sal",
        "max_sal",
        "currency",
        "allow_employees",
        "status",
        "job_code",
        "job_slug",
        "created_by",
        "modified_by",
      ])
    );
    jobs
      .save()
      .then((doc) => {
        res.status(200).json({
          message: "job Added Successfully",
          results: doc,
        });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  //}
};
exports.updateJob = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  Job.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  let jobs = await Job.findByIdAndUpdate({ _id: req.params.id }, req.body);
  res.status(200).send("updated");
  await jobs.save();
};

exports.deleteJob = async (req, res, next) => {
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid request");
  Job.findByIdAndRemove({ _id: req.params.id })
    .then((doc) => {
      res.status(200).json({
        message: "job Deleted Successfully",
      });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
