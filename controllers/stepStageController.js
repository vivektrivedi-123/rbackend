const mongoose = require("mongoose");
const Step = require("../models/stepStage");
const _ = require("lodash");

exports.getStep = async (req, res, next) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);
  const mysort = { order: 1 };
  Step.find()
    .sort(mysort)
    .skip(skip)
    .limit(limit)
    .then((data) => {
      res.status(200).json({
        results: data,
      });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
exports.getStepById = async (req, res, next) => {
  const mysort = { order: 1 };
  Step.findById({ _id: req.params.id })
    .select(" -__v")
    .sort(mysort)
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
exports.addStep = async (req, res, next) => {
  let steps = new Step(
    _.pick(req.body, ["stepName", "order", "created_by", "modified_by"])
  );
  steps
    .save()
    .then((doc) => {
      res.status(200).json({
        message: "step Added Successfully",
        results: doc,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};
exports.putStep = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  Step.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  let step = await Step.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  });
  await step.save();
  res.status(200).json(step);
};
exports.patchStep = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  Step.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  let step = await Step.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  });
  await step.save();
  res.status(200).json(step);
};
exports.deleteStep = async (req, res, next) => {
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid request");
  Step.findByIdAndRemove({ _id: req.params.id })
    .then((doc) => {
      res.status(200).json({
        message: "step Deleted Successfully",
      });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
