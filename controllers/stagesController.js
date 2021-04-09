const Stage = require("../models/job_stages");
const mongoose = require("mongoose");
const _ = require("lodash");
exports.getStage = async (req, res, next) => {
  let stage = await Stage.find();
  if (!stage) {
    res.status(404).send("Stage not Found");
  } else {
    res.status(200).send(stage);
  }
};
exports.getStageByID = async (req, res, next) => {
  let stage = await Stage.findById({ _id: req.params.id });
  if (!stage) {
    res.status(404).send("Stage not Found");
  } else {
    res.status(200).send(stage);
  }
};
exports.addStage = async (req, res, next) => {
  let stage = await Stage.findOne({ stage: req.body.stage });
  if (stage) {
    res.status(409).send("Stage Already Exists");
  } else {
    let stages = new Stage(
      _.pick(req.body, [
        "stage_id",
        "location_id",
        "job_id",
        "stage",
        "status",
        "created_by",
        "modified_by",
      ])
    );
    await stages.save();
    res.status(200).send("Registered");
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
  let id = await req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  Stage.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  Stage.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.deletedCount > 0) {
      res.status(200).send({ message: `Deleted ${result.deletedCount} item.` });
    } else {
      res.status(404).send(`Delete failed `);
    }
  });
};
