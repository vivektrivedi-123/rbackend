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
    .populate({ path: "company", select: " -__v" })
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
    .select(" -__v")
    .populate({ path: "company", select: " -__v" })
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

exports.addLocation = async (req, res, next) => {
  let locations = new Location(
    _.pick(req.body, [
      "company",
      "location_name",
      "location_address",
      "location_city",
      "location_state",
      "postal_code",
      "country",
      "currency",
      "primary_language",
      "time_zone",
      "date_format",
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
};

exports.putLocation = async (req, res, next) => {
  Location.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  try {
    let update = await Location.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    await update.save();
    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

exports.patchLocation = async (req, res, next) => {
  Location.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
   try {
    let update = await Location.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    await update.save();
    res.status(200).json(update);
   } catch (error) {
     res.status(500).json({message:error.message})
   }
};

exports.deleteLocation = async (req, res, next) => {
  try {
    let location = await Location.findByIdAndDelete({_id:req.params.id})
    if(location){
      res.status(200).json({message:"location deleted successfully"})
    } else{
      res.status(400).json({message:"location not found"})
    }
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};
