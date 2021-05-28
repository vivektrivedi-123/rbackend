const express = require("express");
const mongoose = require("mongoose");
const forms = require("../models/forms");
const job = require("../models/job");
const Application = require("../models/application");
const multer = require("multer");
const _ = require("lodash");
const department = require("../models/department");
const category = require("../models/category");
const upload = multer({
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|JPG|PNG|JPEG|jpeg)$/))
      return cb(new Error("This is not a correct format of the file"));
    cb(undefined, true);
  },
});
exports.getApplication = async (req, res, next) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);
  Application.find()
    .skip(skip)
    .limit(limit)
    .select(" -__v")
    .populate({
      path: "job",
      select: " -__v ",
      populate: {
        path: "department",
        select: "-__v",
        populate: {
          path: "location",
          select: " -__v",
          populate: {
            path: "company",
            select: " -__v",
          },
        },
      },
    })

    .populate({
      path: "job",
      select: " -__v ",
      populate: {
        path: "category",
        select: " -__v -location",
      },
    })
    .populate({
      path: "forms",
      select: " -__v -job",
      populate: { path: "field", select: " -__v -location" },
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
    .select(" -__v")
    .populate({
      path: "job",
      select: " -__v ",
      populate: {
        path: "department",
        select: " -__v",
        populate: {
          path: "location",
          select: " -__v",
          populate: { path: "company", select: "-__v" },
        },
      },
    })
    .populate({
      path: "job",
      select: " -__v ",
      populate: {
        path: "category",
        select: " -__v -location",
      },
    })
    .exec()
    .then((doc, err) => {
      if (doc) {
        res.status(200).json({
          results: doc,
        });
      } else {
        res.send("ID does not exists").status(404);
      }
    })

    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
};
exports.addApplication = async (req, res, next) => {
  let resume = JSON.stringify(req.file.path);
  let applications = await new Application(
    _.pick(req.body, [
      "job",
      "forms",
      "form_values",
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
  applications.resume = resume;
  applications
    .save()
    .then((doc) => {
      res.status(200).json({
        message: "Application Added Successfully",
        results: doc,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};
exports.putApplication = async (req, res, next) => {
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
    req.body,
    { new: true }
  );
  await update.save();
  res.json({ message: "Application Updated", update }).status(200);
  
};

exports.patchApplication = async (req, res, next) => {
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
    req.body,
    { new: true }
  );
  await update.save();
  res.json({ message: "Application Updated", update }).status(200);
  
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
