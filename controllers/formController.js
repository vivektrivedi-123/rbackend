const Form = require("../models/forms");
const mongoose = require("mongoose");
const _ = require("lodash");
const job = require("../models/job");
const field = require("../models/field");
const location = require("../models/location");
const department = require("../models/department");

exports.getForm = async (req, res, next) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit); 
  Form.find()
  .skip(skip)
  .limit(limit)
    
    .select("-_id -__v")
    .populate({
      path: "job",
      select: "-_id -__v ",
      populate: {
        path: "department",
        select: "-_id -__v",
        populate: {
          path: "location",
          select: "-_id -__v",
          populate: { path: "company", select: "-_id -__v" },
        },
      },
    })
    .populate({
      path: "job",
      select: "-_id -__v ",
      populate: {
        path: "category",
        select: "-_id -__v -location",
      },
    })
    .populate({ path: "field", select: "-_id -__v -location" })
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
exports.getFormById = async (req, res, next) => {
  Form.findById({ _id: req.params.id })
    .select("-_id -__v")
    .populate({
      path: "job",
      select: "-_id -__v ",
      populate: {
        path: "department",
        select: "-_id -__v",
        populate: {
          path: "location",
          select: "-_id -__v",
          populate: {
            path: "company",
            select: "-_id -__v",
          },
        },
      },
    })
    .populate({
      path: "job",
      select: "-_id -__v ",
      populate: {
        path: "category",
        select: "-_id -__v -location",
      },
    })
    .populate({ path: "field", select: "-_id -__v -location" })
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
exports.addForm = async (req, res, next) => {
  let form = await Form.findOne({ label: req.body.label });
  if (form) {
    res.status(409).send("Form Already Exists");
  } else {
    let forms = new Form(
      _.pick(req.body, [
        "job",
        "field",
        "label",
        "placeholder",
        "is_required",
        "order",
        "created_by",
        "modified_by",
      ])
    );
    forms
      .save()
      .then((doc) => {
        res.status(200).json({
          message: "Form Added Successfully",
          results: doc,
        });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
};
exports.updateForm = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  Form.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  let update = await Form.findByIdAndUpdate({ _id: req.params.id }, req.body);
  res.status(200).json(update);
};

exports.deleteForm = async (req, res, next) => {
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid request");
  Form.findByIdAndRemove({ _id: req.params.id })
    .then((doc) => {
      res.status(200).json({
        message: "Form Deleted Successfully",
      });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
