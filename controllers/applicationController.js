const express = require("express");
const mongoose = require("mongoose");
const forms = require("../models/forms");
const job = require("../models/job");
const Application = require("../models/application");
const _ = require("lodash");
const department = require("../models/department");
const category = require("../models/category");

exports.getApplication = async (req, res, next) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit); 
  Application.find()
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
    .populate({
      path: "forms",
      select: "-_id -__v -job",
      populate: { path: "field", select: "-_id -__v -location" },
    })
    .exec()
    .then((data) => {
      res.status(200).json({
        results: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
};

exports.getApplicationById = async (req, res, next) => {
  Application.findById({ _id: req.params.id })
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
    .then((data) => {
      res.status(200).json({
        message: "OK",
        results: data,
      });
    })
    .catch((err) => {
      res.json(err);
    });
};
exports.addApplication = async (req, res, next) => {
  let applications = await new Application(
    _.pick(req.body, [
      "job",
      "forms",
      "form_values",
      "resume",
      "origin",
      "tags",
      "status",
      "overall_rating",
      "lead_owner",
      "is_deleted",
      "is_blocked",
      "social_profiles",
      "refer_by",
      "add_to_talent_pool",
      "created_by",
      "modified_by",
    ])
  );
  applications
    .save()
    .then((doc) => {
      res.status(200).json({
        message: "Application Added Successfully",
        results: doc,
      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
exports.updateApplication = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid request");
  Application.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null)
      res.status(400).send("ID in the body is not matching ID in the URL");
  });
  let update = await Application.findByIdAndUpdate(
    { _id: req.params.id },
    req.body
  );
  res.json({ message: "Application Updated" }).status(200);
};

exports.deleteApplication = async (req, res, next) => {
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid request");
  Application.findByIdAndRemove({ _id: req.params.id })
    .then((doc) => {
      res.status(200).json({
        message: "Application Deleted Successfully",
      });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
