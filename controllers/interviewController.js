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
      select: " -__v",
      populate: {
        path: "job",
        select: " -__v",
        populate: {
          path: "department",
          select: " -__v",
          populate: {
            path: "location",
            select: " -__v",
            populate: { path: "company", select: " -__v" },
          },
        },
      },
    })
    .populate({
      path: "application",
      select: " -__v",
      populate: {
        path: "job",
        select: " -__v",
        populate: { path: "category", select: " -__v -location" },
      },
    })
    .populate({
      path: "stages",
      select: " -__v -job",
    })
    .populate({
      path: "application",
      select: " -__v",
      populate: {
        path: "forms",
        select: " -__v -job ",
        populate: { path: "field", select: " -__v -location" },
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
      select: " -__v",
      populate: {
        path: "job",
        select: " -__v",
        populate: {
          path: "department",
          select: " -__v",
          populate: {
            path: "location",
            select: " -__v",
            populate: { path: "company", select: " -__v" },
          },
        },
      },
    })
    .populate({
      path: "application",
      select: " -__v",
      populate: {
        path: "job",
        select: " -__v",
        populate: { path: "category", select: " -__v -location" },
      },
    })
    .populate({
      path: "stages",
      select: " -__v -job",
    })
    .populate({
      path: "application",
      select: " -__v",
      populate: {
        path: "forms",
        select: " -__v -job ",
        populate: { path: "field", select: " -__v -location" },
      },
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

exports.putInterview = async (req, res, next) => {
  Interview.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  try {
    let update = await Interview.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    await update.save();
    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};
  

exports.patchInterview = async (req, res, next) => {
  Interview.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  try {
    let update = await Interview.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    await update.save();
    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

exports.deleteInterview = async (req, res, next) => {
  try {
    let interview = await Interview.findByIdAndDelete({_id:req.params.id})
    if(interview){
      res.status(200).json({message:"interview deleted successfully"})
    } else{
      res.status(400).json({message:"interview not found"})
    }
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};
