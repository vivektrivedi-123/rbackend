const Category = require("../models/job_category");
const mongoose = require("mongoose");
const _ = require("lodash");
exports.getCategory = async (req, res, next) => {
  let category = await Category.find();
  if (!category) {
    res.status(404).send("No Category Found");
  } else {
    res.status(200).send(category);
  }
};
exports.getCategoryById = async (req, res, next) => {
  let category = await Category.findById({ _id: req.params.id });
  if (!category) {
    res.status(404).send("No Category Found");
  } else {
    res.status(200).send(category);
  }
};
exports.addCategory = async (req, res, next) => {
  let category = await Category.findOne({ category: req.body.category });
  if (category) {
    res.status(409).send("Category Already Exists");
  } else {
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
    return res.status(200).send("Category Added");
  }
};
exports.updateCategory = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid request");
  Category.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid request");
  });
  let update = await Category.findByIdAndUpdate(
    { _id: req.params.id },
    req.body
  );
  res.json(update).status(200);
};

exports.deleteCategory = async (req, res, next) => {
  let id = await req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  Category.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  Category.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.deletedCount > 0) {
      res.status(200).send({ message: `Deleted ${result.deletedCount} item.` });
    } else {
      res.status(404).send(`Delete failed `);
    }
  });
};
