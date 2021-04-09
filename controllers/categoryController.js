const Category = require("../models/job_category");
const mongoose = require("mongoose");
const _ = require("lodash");
exports.getCategory = async (req, res, next) => {
  let category = await Category.find();
  if (!category) {
    res.status(404);
  } else {
    res.send(category);
  }
};
exports.getCategoryByID = async (req, res, next) => {
  let category = await Category.findById({ _id: req.params.id });
  if (!category) {
    res.status(400);
  } else {
    res.send(category);
  }
};
exports.addCategory = async (req, res, next) => {
  let category = await Category.findOne({ category_id: req.body.category_id });
  if (category) {
    res.status(409);
  } else {
    let categories = new Category(
      _.pick(req.body, [
        "category_id",
        "location_id",
        "category",
        "status",
        "created_by",
        "modified_by",
      ])
    );
    await categories.save();
    res.send("Registered");
  }
};
exports.updateCategory = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0) res.status(400);
  Category.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400);
  });
  let update = await Category.findByIdAndUpdate(
    { _id: req.params.id },
    req.body
  );
  res.json(update);
};

exports.deleteCategory = async (req, res, next) => {
  let id = await req.params.id;
  if (!req.params.id || req.params.id < 0) res.status(400);
  Category.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400);
  });
  Category.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.deletedCount > 0) {
      res.status(200);
    } else {
      res.status(401);
    }
  });
};
