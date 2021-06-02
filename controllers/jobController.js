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
    .select(" -__v")
    .populate({
      path: "stages",
      select: "-job -__v -createdAt -updatedAt",
      populate: {
        path: "stageData",
        select: "-job -__v -createdAt -updatedAt",

        populate: {
          path: "stepStage",
          select: "-__v -createdAt -updatedAt",
        },
      },
    })
    .populate({
      path: "department",
      select: " -__v",
      populate: {
        path: "location ",
        select: " -__v",
        populate: { path: "company", select: " -__v" },
      },
    })
    .populate({
      path: "category",
      select: "-location -createdAt -updatedAt  -__v",
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
    .select(" -__v")
    .sort({ stages: 1 })
    .populate({
      path: "stages",
      select: "-job -__v -createdAt -updatedAt",
      populate: {
        path: "stageData",
        select: "-job -__v -createdAt -updatedAt",

        populate: {
          path: "stepStage",
          select: "-__v -createdAt -updatedAt",
        },
      },
    })
    .populate({
      path: "department",
      select: " -__v",
      populate: {
        path: "location ",
        select: " -__v",
        populate: { path: "company", select: " -__v" },
      },
    })
    .populate({
      path: "category",
      select: "-location -createdAt -updatedAt  -__v",
    })
    .exec()
    .then((doc, err) => {
      if (doc) {
        res.status(200).json({
          results: doc,
        });
      } else {
        res.send("ID does not exists").status(404);
      }
    })

    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
};
exports.addJob = async (req, res, next) => {
  let jobs = new Job(
    _.pick(req.body, [
      "job_title",
      "department",
      "category",
      "stageData",
      "branch",
      "skills",
      "job_type",
      "remote_job",
      "job_description",
      "experience",
      "min_sal",
      "max_sal",
      "currency",
      "allow_employees",
      "publish",
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
exports.putJob = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(404).send("Invalid Request");
  Job.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  let update = await Job.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  });
  await update.save();
  res.status(200).json({ message: "Job updated", update });
};

exports.patchJob = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(404).send("Invalid Request");
  Job.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  let update = await Job.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  });
  await update.save();
  res.status(200).json({ message: "Job updated", update });
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
