const Location = require("../models/location");
const mongoose = require("mongoose");
const _ = require("lodash");
exports.getLocation = async (req, res, next) => {
  let location = await Location.find();
  if (!location) {
    res.status(404).send("No Location Found");
  } else {
    res.status(200).send(location);
  }
};
exports.getLocationById = async (req, res, next) => {
  let location = await Location.findById({ _id: req.params.id });
  if (!location) {
    res.status(404).send("No Location Found");
  } else {
    res.status(200).send(location);
  }
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
    res.status(200).send("Registered");
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
  let id = await req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  Location.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  Location.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.deletedCount > 0) {
      res.status(200).send({ message: `Deleted ${result.deletedCount} item.` });
    } else {
      res.status(401).send(`Delete failed `);
    }
  });
};
