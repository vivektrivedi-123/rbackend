const mongoose = require("mongoose");
const Category = require("../models/job_category");

const _ = require("lodash");
const location = require("../models/location");
exports.getCategory = async (req, res, next) => {
  Category.find()
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
exports.getCategoryById = async (req, res, next) => {
  Category.findById({ _id: req.params.id })
    .populate({
      path: "location",
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
exports.addCategory = async (req, res, next) => {
  Category.find().populate({
    path: "location",
  });
  let categories = new Category(
    _.pick(req.body, [
      "location",
      "category",
      "status",
      "created_by",
      "modified_by",
    ])
  );

  categories
    .save()
    .then((doc) => {
      res.status(200).json({
        message: "Category Added Successfully",
        doc,
      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
exports.updateCategory = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  Category.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });

  let category = await Category.findByIdAndUpdate(
    { _id: req.params.id },
    req.body
  );
  res.status(200).json(category);
  await category.save();
};
exports.deleteCategory = async (req, res, next) => {
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid request");
  Category.findByIdAndRemove({ _id: req.params.id })
    .then((doc) => {
      res.status(200).json({
        message: "Category Deleted Successfully",
      });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
