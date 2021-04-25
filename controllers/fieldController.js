const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const Field = require("../models/field");
const Location = require("../models/location");
exports.getField = async (req, res, next) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit); 
  Field.find()
  .skip(skip)
  .limit(limit)
  
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

exports.getFieldById = async (req, res, next) => {
  Field.findById({ _id: req.params.id })
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
      res.status(400).json(err);
    });
};
exports.addField = async (req, res, next) => {
  let fields = new Field(
    _.pick(req.body, [
      "location",
      "field_name",
      "field_type",
      "field_options",
      "created_by",
      "modified_by",
    ])
  );
  fields
    .save()
    .then((doc) => {
      res.status(200).json({
        message: "Field Added Successfully",
        results: doc,
      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
exports.updateField = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  Field.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  let update = await Field.findByIdAndUpdate({ _id: req.params.id }, req.body);
  res.status(200).json(update);
};

exports.deleteField = async (req, res, next) => {
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid request");
  Field.findByIdAndRemove({ _id: req.params.id })
    .then((doc) => {
      res.status(200).json({
        message: "Field Deleted Successfully",
      });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
