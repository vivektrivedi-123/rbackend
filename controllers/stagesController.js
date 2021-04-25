const Stage = require("../models/stage");
const mongoose = require("mongoose");
const _ = require("lodash");
const location = require("../models/location");
const job = require("../models/job");
const department = require("../models/department");
const company = require("../models/company");

exports.getStage = async (req, res, next) => {
  const { page = 1, limit = 2 } = req.query;
  Stage.find()
  .limit(limit)
  .skip((page - 1) * limit)
    .select("-_id -__v")
    .populate({
      path: "job",
      select: "-_id -__v",
      populate: {
        path: "department",
        select: "-_id -__v",
        populate: {
          path: "location ",
          select: "-_id -__v",
          populate: { path: "company", select: "-_id -__v" },
        },
      },
    })
    .populate({
      path: "job",
      select: "-_id -__v ",
      populate: {
        path: "category",
        select: "-_id -__v -location",
      },
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
exports.getStageById = async (req, res, next) => {
  Stage.findById({ _id: req.params.id })
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
exports.addStage = async (req, res, next) => {
  let stage = await Stage.findOne({ stage: req.body.stage });
  if (stage) {
    res.status(409).send("Stage Already Exists");
  } else {
    let stages = new Stage(
      _.pick(req.body, ["job", "stage", "status", "created_by", "modified_by"])
    );
    stages
      .save()
      .then((doc) => {
        res.status(200).json({
          message: "Stage Added Successfully",
          results: doc,
        });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
};
exports.updateStage = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  Stage.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  let update = await Stage.findByIdAndUpdate({ _id: req.params.id }, req.body);
  res.status(200).json(update);
};
exports.deleteStage = async (req, res, next) => {
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid request");
  Stage.findByIdAndRemove({ _id: req.params.id })
    .then((doc) => {
      res.status(200).json({
        message: "Stage Deleted Successfully",
      });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
