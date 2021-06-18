const Category = require("../models/category");
const mongoose = require("mongoose");
const _ = require("lodash");
const location = require("../models/location");
const company = require("../models/company");

exports.getCategory = async (req, res, next) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);
  try {
    let category = await Category.find()
    .skip(skip)
    .limit(limit)
    .select(" -__v")
    .populate({
      path: "location",
      select: " -__v",
      populate: { path: "company", select: " -__v" },
    });
  if (!category) {
    res.status(404).send("No Category Found");
  } else {
    res.status(200).send(category);
  }
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    let category = await Category.findById({ _id: req.params.id })
    .select(" -__v")
    .populate({
      path: "location",
      populate: { path: "company", select: " -__v" },
    });
  if (!category) {
    res.status(404).send("ID does not exists");
  } else {
    res.status(200).send(category);
  }
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

exports.addCategory = async (req, res, next) => {
  try {
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
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

exports.putCategory = async (req, res, next) => {
  Category.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid request");
  });
  try {
    let update = await Category.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    await update.save();
    res.json(update).status(200);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

exports.patchCategory = async (req, res, next) => {
  Category.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid request");
  });
  try {
    let update = await Category.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    await update.save();
    res.json(update).status(200);
  } catch (error) {
    res.status(500).json({message:error.message})
  } 
};

exports.deleteCategory = async (req, res, next) => {
  try {
    let category = await Category.findByIdAndDelete({_id:req.params.id})
    if(category){
      res.status(200).json({message:"category deleted successfully"})
    } else{
      res.status(400).json({message:"category not found"})
    }
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};
