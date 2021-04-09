const Options = require("../models/options");
const mongoose = require("mongoose");
const _ = require("lodash");
exports.getOptions = async (req, res, next) => {
  let options = await Options.find();
  if (!options) {
    res.status(404).send("Option not found");
  } else {
    res.status(200).send(options);
  }
};
exports.getOptionsByID = async (req, res, next) => {
  let options = await Options.findById({ _id: req.params.id });
  if (!options) {
    res.status(404).send("Options not Found");
  } else {
    res.status(200).send(options);
  }
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
        "location_id",
        "created_by",
        "modified_by",
      ])
    );
    await option.save();
    res.status(200).send("Registered");
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
  let id = await req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  Options.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  Options.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.deletedCount > 0) {
      res.status(200).send({ message: `Deleted ${result.deletedCount} item.` });
    } else {
      res.status(404).send("Delete Failed");
    }
  });
};
