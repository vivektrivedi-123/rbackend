const Options = require("../models/options");
const mongoose = require("mongoose");
const _ = require("lodash");
const location = require("../models/location");
const company = require("../models/company");
//const PER_PAGE = 5;
exports.getOptions = async (req, res, next) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);
  Options.find()
    .limit(limit)
    .skip(skip)
    .select("-_id -__v")
    .populate({
      path: "location",
      select: "-_id -__v",
      populate: { path: "company", select: "-_id -__v" },
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
exports.getOptionsById = async (req, res, next) => {
  Options.findById({ _id: req.params.id })
    .select("-_id -__v")
    .populate({
      path: "location",
      select: "-_id -__v",
      populate: { path: "company", select: "-_id -__v" },
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
exports.addOptions = async (req, res, next) => {
  let options = await Options.findOne({ option_value: req.body.option_value });
  if (options) {
    res.status(409).send("Option Already Exists");
  } else {
    let option = new Options(
      _.pick(req.body, [
        "option_key",
        "option_value",
        "location",
        "created_by",
        "modified_by",
      ])
    );
    option
      .save()
      .then((doc) => {
        res.status(200).json({
          message: "Option Added Successfully",
          results: doc,
        });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
};
exports.updateOptions = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  Options.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  let update = await Options.findByIdAndUpdate(
    { _id: req.params.id },
    req.body
  );
  res.status(200).json(update);
};

exports.deleteOptions = async (req, res, next) => {
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid request");
  Options.findByIdAndRemove({ _id: req.params.id })
    .then((doc) => {
      res.status(200).json({
        message: "Option Deleted Successfully",
      });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
