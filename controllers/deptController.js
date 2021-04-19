const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const location = require("../models/location");
const company = require("../models/company");
const Department = require("../models/department");
const PER_PAGE = 5;

exports.getDept = async (req, res, next) => {
  Department.find()
    .populate({
      path: "location",
      populate: { path: "company" },
    })
    .populate("company")
    // .skip(PER_PAGE * page - PER_PAGE)
    // .limit(PER_PAGE)
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
exports.getDeptById = async (req, res, next) => {
  Department.findById({ _id: req.params.id })
    .populate({
      path: "location",
      populate: { path: "company" },
    })
    .populate("company")
    // .skip(PER_PAGE * page - PER_PAGE)
    // .limit(PER_PAGE)
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
exports.addDept = async (req, res, next) => {
  let dept = await Department.findOne({
    department_name: req.body.department_name,
  });
  if (dept) {
    res.status(409).send("Department Already Exists");
  } else {
    let deptt = new Department(
      _.pick(req.body, [
        "location",
        "department_name",
        "created_by",
        "modified_by",
      ])
    );
    await deptt
      .save()
      .then((doc) => {
        res.status(200).json({
          message: "Department Added Successfully",
          results: doc,
        });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
};
exports.updateDept = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(404).send("Invalid Request");
  Department.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  let update = await Department.findByIdAndUpdate(
    { _id: req.params.id },
    req.body
  );
  await update.save();
  res.status(200).json(update);
};

exports.deleteDept = async (req, res, next) => {
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid request");
  Department.findByIdAndRemove({ _id: req.params.id })
    .then((doc) => {
      res.status(200).json({
        message: "Department Deleted Successfully",
      });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
