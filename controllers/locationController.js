const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const company = require("../models/company");
const Location = require("../models/location");

exports.getLocation = async (req, res, next) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);
  Location.find()
    .limit(limit)
    .skip(skip)
    .select("-__v")
    .populate({ path: "company", select: "-_id -__v" })
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
exports.getLocationById = async (req, res, next) => {
  let location = await Location.findById({ _id: req.params.id })
    .select("-_id -__v")
    .populate({ path: "company", select: "-_id -__v" })
    .exec()
    .then((data) => {
      res.status(200).json({
        results: data,
      });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
  console.log(location);
};
exports.addLocation = async (req, res, next) => {
  let location = await Location.findOne({
    location_address: req.body.location_address,
  });
  if (location) {
    res.status(409).send("Location Already Exists");
  } else {
    let locations = new Location(
      _.pick(req.body, [
        "company",
        "location_address",
        "location_street",
        "location_city",
        "location_state",
        "postal_code",
        "country_id",
        "website",
        "contact",
        "created_by",
        "modified_by",
      ])
    );
    locations
      .save()
      .then((doc) => {
        res.status(200).json({
          message: "Location Added Successfully",
          results: doc,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
};
exports.updateLocation = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  Location.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  let update = await Location.findByIdAndUpdate(
    { _id: req.params.id },
    req.body
  );
  res.status(200).json(update);
};

exports.deleteLocation = async (req, res, next) => {
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid request");
  Location.findByIdAndRemove({ _id: req.params.id })
    .then((doc) => {
      res.status(200).json({
        message: "Location Deleted Successfully",
      });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
