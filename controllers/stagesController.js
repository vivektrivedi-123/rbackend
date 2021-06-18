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
  Stage.find().sort({ stage: 1, order: 1 })
    .skip(skip)
    .limit(limit)
    .select(" -__v")
    // .populate({
    //   path: "stage",
    //   select: " -__v",
    //   //   populate: {
    //   //     path: "department",
    //   //     select: " -__v",
    //   //     populate: {
    //   //       path: "location ",
    //   //       select: " -__v",
    //   //       populate: { path: "company", select: " -__v" },
    //   //     },
    //   //   },
    //   // })
    //   // .populate({
    //   //   path: "job",
    //   //   select: " -stages -__v ",
    //   //   populate: {
    //   //     path: "category",
    //   //     select: " -__v -location",
    //   //   },
    //   // })
    //   // .populate({
    //   //   path: "stepStage",
    //   //   select: "-__v",
    // })
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
    // .populate({
    //   path: "stage",
    //   select: "__v",
    //   //   populate: {
    //   //     path: "stages",
    //   //   },
    //   // })
    //   // .populate({
    //   //   path: "job",
    //   //   select: "-stages -__v",
    //   //   populate: {
    //   //     path: "department",
    //   //     select: " -__v",
    //   //     populate: {
    //   //       path: "location ",
    //   //       select: " -__v",
    //   //       populate: { path: "company", select: " -__v" },
    //   //     },
    //   //   },
    //   // })
    //   // .populate({
    //   //   path: "job",
    //   //   select: "-stages  -__v ",
    //   //   populate: {
    //   //     path: "category",
    //   //     select: " -__v -location",
    //   //   },
    //   // })
    //   // .populate({
    //   //   path: "stepStage",
    //   //   select: "-__v",
    // })
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
      "stageData",
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
  Stage.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  try {
    let stage = await Stage.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true
    });
    await stage.save();
    res.status(200).json(stage);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

exports.patchStage = async (req, res, next) => {
  Stage.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  try {
    let stage = await Stage.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true
    });
    await stage.save();
    res.status(200).json(stage);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

exports.deleteStage = async (req, res, next) => {
  try {
    let stage = await Stage.findByIdAndDelete({_id:req.params.id})
    if(stage){
      res.status(200).json({message:"stage deleted successfully"})
    } else{
      res.status(400).json({message:"stage not found"})
    }
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};
