const Field = require("../models/field");
const mongoose = require("mongoose");
const _ = require("lodash");
exports.getField = async (req, res, next) => {
  let field = await Field.find();
  if (!field) {
    res.status(404);
  } else {
    res.send(field);
  }
};
exports.getFieldByID = async (req, res, next) => {
  let field = await Field.findById({ _id: req.params.id });
  if (!field) {
    res.status(400);
  } else {
    res.send(field);
  }
};
exports.addField = async (req, res, next) => {
  let field = await Field.findOne({ field_name: req.body.field_name });
  if (field) {
    res.status(409);
  } else {
    let fields = new Field(
      _.pick(req.body, [
        "field_id",
        "location_id",
        "field_name",
        "field_type",
        "field_options",
        "created_by",
        "modified_by",
      ])
    );
    await fields.save();
    res.send("Registered");
  }
};
exports.updateField = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0) res.status(400);
  Field.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400);
  });
  let update = await Field.findByIdAndUpdate({ _id: req.params.id }, req.body);
  res.json(update);
};

exports.deleteField = async (req, res, next) => {
  let id = await req.params.id;
  if (!req.params.id || req.params.id < 0) res.status(400);
  Field.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400);
  });
  Field.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.deletedCount > 0) {
      res.status(200);
    } else {
      res.status(401);
    }
  });
};
