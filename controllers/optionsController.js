const Options = require("../models/options");
const mongoose = require("mongoose");
const _ = require("lodash");
const location = require("../models/location");
const company = require("../models/company");

exports.getOptions = async (req, res, next) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);
  Options.find()
    .limit(limit)
    .skip(skip)
    .select(" -__v")
    .populate({
      path: "location",
      select: " -__v",
      populate: { path: "company", select: " -__v" },
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
    .select(" -__v")
    .populate({
      path: "location",
      select: " -__v",
      populate: { path: "company", select: " -__v" },
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

exports.addOptions = async (req, res, next) => {
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
};

exports.putOptions = async (req, res, next) => {
  Options.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  try {
    let update = await Options.findByIdAndUpdate(
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
    

exports.patchOptions = async (req, res, next) => {
  Options.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  try {
    let update = await Options.findByIdAndUpdate(
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

exports.deleteOptions = async (req, res, next) => {
  try {
    let option = await Options.findByIdAndDelete({_id:req.params.id})
    if(option){
      res.status(200).json({message:"option deleted successfully"})
    } else{
      res.status(400).json({message:"option not found"})
    }
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};
