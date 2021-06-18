const mongoose = require("mongoose");
const _ = require("lodash");
const Field = require("../models/field");
const Location = require("../models/location");
exports.getField = async (req, res, next) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);
  Field.find()
    .skip(skip)
    .limit(limit)
    .select(" -__v")
    .populate({
      path: "location",
      select: " -__v",
      populate: { path: "company", select: " -__v" },
    })
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

exports.getFieldById = async (req, res, next) => {
  Field.findById({ _id: req.params.id })
    .select(" -__v")
    .populate({
      path: "location",
      select: " -__v",
      populate: { path: "company", select: " -__v" },
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

exports.addField = async (req, res, next) => {
  let fields = new Field(
    _.pick(req.body, [
      "location",
      "field_name",
      "field_type",
      "field_options",
      "created_by",
      "modified_by",
    ])
  );
  fields
    .save()
    .then((doc) => {
      res.status(200).json({
        message: "Field Added Successfully",
        results: doc,
      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

exports.putField = async (req, res, next) => {
  Field.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  try {
    let update = await Field.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    await update.save();
    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

exports.patchField = async (req, res, next) => {
  Field.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  try {
    let update = await Field.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    await update.save();
    res.status(200).json(update); 
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

exports.deleteField = async (req, res, next) => {
  try {
    let field = await Field.findByIdAndDelete({_id:req.params.id})
    if(field){
      res.status(200).json({message:"field deleted successfully"})
    } else{
      res.status(400).json({message:"field not found"})
    }
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};
