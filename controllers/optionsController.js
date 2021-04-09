const Options = require("../models/options");
const mongoose = require("mongoose");
const _ = require("lodash");
exports.getOptions = async (req, res, next) => {
  let options = await Options.find();
  if (!options) {
    res.status(404);
  } else {
    res.send(options);
  }
};
exports.getOptionsByID = async (req, res, next) => {
  let options = await Options.findById({ _id: req.params.id });
  if (!options) {
    res.status(400);
  } else {
    res.send(options);
  }
};
exports.addOptions = async (req, res, next) => {
  let options = await Options.findOne({ option_id: req.body.option_id });
  if (options) {
    res.status(409);
  } else {
    let option = new Options(
      _.pick(req.body, [
        "option_id",
        "option_key",
        "option_value",
        "location_id",
        "created_by",
        "modified_by",
      ])
    );
    await option.save();
    res.send("Registered");
  }
};
exports.updateOptions = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0) res.status(400);
  Options.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400);
  });
  let update = await Options.findByIdAndUpdate(
    { _id: req.params.id },
    req.body
  );
  res.json(update);
};

exports.deleteOptions = async (req, res, next) => {
  let id = await req.params.id;
  if (!req.params.id || req.params.id < 0) res.status(400);
  Options.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400);
  });
  Options.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.deletedCount > 0) {
      res.status(200);
    } else {
      res.status(401);
    }
  });
};
