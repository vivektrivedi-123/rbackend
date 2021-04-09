const Location = require("../models/location");
const mongoose = require("mongoose");
const _ = require("lodash");
exports.getLocation = async (req, res, next) => {
  let location = await Location.find();
  if (!location) {
    res.status(404);
  } else {
    res.send(location);
  }
};
exports.getLocationByID = async (req, res, next) => {
  let location = await Location.findById({ _id: req.params.id });
  if (!location) {
    res.status(400);
  } else {
    res.send(location);
  }
};
exports.addLocation = async (req, res, next) => {
  let location = await Location.findOne({ location_id: req.body.location_id });
  if (location) {
    res.status(409);
  } else {
    let locations = new Location(
      _.pick(req.body, [
        "location_id",
        "company_id",
        "loaction_address",
        "loaction_street",
        "loaction_city",
        "loaction_state",
        "postal_code",
        "country_id",
        "website",
        "contact",
        "created_by",
        "modified_by",
      ])
    );
    await locations.save();
    res.send("Registered");
  }
};
exports.updateLocation = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0) res.status(400);
  Location.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400);
  });
  let update = await Location.findByIdAndUpdate(
    { _id: req.params.id },
    req.body
  );
  res.json(update);
};

exports.deleteLocation = async (req, res, next) => {
  let id = await req.params.id;
  if (!req.params.id || req.params.id < 0) res.status(400);
  Location.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400);
  });
  Location.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.deletedCount > 0) {
      res.status(200);
    } else {
      res.status(401);
    }
  });
};
