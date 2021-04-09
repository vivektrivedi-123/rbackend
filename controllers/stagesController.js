const Stage = require("../models/job_stages");
const mongoose = require("mongoose");
const _ = require("lodash");
exports.getStage = async (req, res, next) => {
  let stage = await Stage.find();
  if (!stage) {
    res.status(404);
  } else {
    res.send(stage);
  }
};
exports.getStageByID = async (req, res, next) => {
  let stage = await Stage.findById({ _id: req.params.id });
  if (!stage) {
    res.status(400);
  } else {
    res.send(stage);
  }
};
exports.addStage = async (req, res, next) => {
  let stage = await Stage.findOne({ stage_id: req.body.stage_id });
  if (stage) {
    res.status(409);
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
    res.send("Registered");
  }
};
exports.updateStage = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0) res.status(400);
  Stage.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400);
  });
  let update = await Stage.findByIdAndUpdate({ _id: req.params.id }, req.body);
  res.json(update);
};

exports.deleteStage = async (req, res, next) => {
  let id = await req.params.id;
  if (!req.params.id || req.params.id < 0) res.status(400);
  Stage.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400);
  });
  Stage.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.deletedCount > 0) {
      res.status(200);
    } else {
      res.status(401);
    }
  });
};
