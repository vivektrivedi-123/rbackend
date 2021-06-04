const Stage = require("../models/stage");
const mongoose = require("mongoose");
const _ = require("lodash");
const location = require("../models/location");
const job = require("../models/job");
const department = require("../models/department");
const company = require("../models/company");

exports.getStage = async (req, res, next) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);
  Stage.find()
    .sort({ order: 1 })
    .skip(skip)
    .limit(limit)
    .select(" -__v")
    .populate({
      path: "job",
      select: "-stages -__v",
      populate: {
        path: "department",
        select: " -__v",
        populate: {
          path: "location ",
          select: " -__v",
          populate: { path: "company", select: " -__v" },
        },
      },
    })
    .populate({
      path: "job",
      select: " -stages -__v ",
      populate: {
        path: "category",
        select: " -__v -location",
      },
    })
    .populate({
      path: "stepStage",
      select: "-__v",
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
    .sort({ order: 1 })
    .select(" -__v")
    .populate({
      path: "job",
      select: "-stages -__v",
      populate: {
        path: "department",
        select: " -__v",
        populate: {
          path: "location ",
          select: " -__v",
          populate: { path: "company", select: " -__v" },
        },
      },
    })
    .populate({
      path: "job",
      select: "-stages  -__v ",
      populate: {
        path: "category",
        select: " -__v -location",
      },
    })
    .populate({
      path: "stepStage",
      select: "-__v",
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

exports.addStage = async (req, res, next) => {
  let stages = new Stage(
    _.pick(req.body, [
      "job",
      "stage",
      "stepName",
      "order",
      "created_by",
      "modified_by",
    ])
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
};

exports.putStage = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  Stage.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  let stage = await Stage.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  });
  await stage.save();
  res.status(200).json(stage);
};

exports.patchStage = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  Stage.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  let stage = await Stage.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  });
  await stage.save();
  res.status(200).json(stage);
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
