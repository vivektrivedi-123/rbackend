const StageData = require("../models/stageData");
const mongoose = require("mongoose");
const _ = require("lodash");
const job = require("../models/job");
const stage = require("../models/stage");

exports.getStageData = async (req, res, next) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);
  StageData.find()
    .sort({ stageData: -1 })
    .skip(skip)
    .limit(limit)
    .select(" -__v")
    .populate({
      path: "stageData",
      select: "-job -__v",
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

exports.getStageDataById = async (req, res, next) => {
  StageData.findById({ _id: req.params.id })
    .select(" -__v")
    .sort({ stage: 1 })
    .populate({
      path: "stageData",
      select: "-job -__v",
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

exports.addStageData = async (req, res, next) => {
  let stage = await StageData.findOne({ name: req.body.name });
  if (stage) {
    res.status(409).send("Data Already Exists");
  } else {
    let stages = new StageData(
      _.pick(req.body, [
        "name",
        "stages",
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
          message: "StageData Added Successfully",
          results: doc,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
};

exports.putStageData = async (req, res, next) => {
  StageData.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  try {
    let stage = await StageData.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true
      }
    );
    await stage.save();
    res.status(200).json(stage);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

exports.patchStageData = async (req, res, next) => {
  StageData.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  try {
    let stage = await StageData.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true
      }
    );
    await stage.save();
    res.status(200).json(stage);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

exports.deleteStageData = async (req, res, next) => {
  try {
    let stageData = await StageData.findByIdAndDelete({_id:req.params.id})
    if(stageData) {
      res.status(200).json({message:"stageData deleted successfully"})
    } else{
      res.status(400).json({message:"stageData not found"})
    }
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};
