const Category = require("../models/category");
const mongoose = require("mongoose");
const _ = require("lodash");
const location = require("../models/location");
const company = require("../models/company");

exports.getCategory = async (req, res, next) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);
  let category = await Category.find()
    .skip(skip)
    .limit(limit)
    .select(" -__v")
    .populate({
      path: "location",
      select: "-_id -__v",
      populate: { path: "company", select: "-_id -__v" },
    });
  if (!category) {
    res.status(404).send("No Category Found");
  } else {
    res.status(200).send(category);
  }
};

exports.getCategoryById = async (req, res, next) => {
  let category = await Category.findById({ _id: req.params.id })
    .select(" -__v")
    .populate({
      path: "location",
      populate: { path: "company", select: "-_id -__v" },
    });
  if (!category) {
    res.status(404).send("ID does not exists");
  } else {
    res.status(200).send(category);
  }
};

exports.addCategory = async (req, res, next) => {
  // let category = await Category.findOne({ category: req.body.category });
  // if (category) {
  //   res.status(409).send("Category Already Exists");
  // } else {
  let categories = new Category(
    _.pick(req.body, [
      "location",
      "category",
      "status",
      "created_by",
      "modified_by",
    ])
  );
  await categories.save();
  res.status(200).json({ message: "Category Added", categories });
  //}
};

exports.putCategory = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid request");
  Category.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid request");
  });
  let update = await Category.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  await update.save();
  res.json(update).status(200);
};
exports.patchCategory = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid request");
  Category.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid request");
  });
  let update = await Category.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  await update.save();
  res.json(update).status(200);
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
