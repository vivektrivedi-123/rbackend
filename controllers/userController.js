const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const flash = require("flash");
const multer = require("multer");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const User = require("../models/user");
const company = require("../models/company");
const role = require("../models/role");
const user = require("../models/user");
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|JPG|PNG|JPEG|jpeg)$/))
      return cb(new Error("This is not a correct format of the file"));
    cb(undefined, true);
  },
});

exports.getUser = async (req, res, next) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);
  User.find()
    .skip(skip)
    .limit(limit)
    .select("-_id -__v")
    .populate("company", "company_name -_id")
    .populate("role", "role_name -_id")
    .exec()
    .then((data) => {
      res.status(200).json({
        results: data,
      });
    })
    .catch((err) => {
      console.log(err);
      req.flash('error','Unable to find user')
      res.status(404).json(err);
    });
};

exports.getUserById = async (req, res, next) => {
  User.findById({ _id: req.params.id })
    .select("-_id -__v")
    .populate("company", "company_name -_id")
    .populate("role", "role_name -_id")
    .exec()
    .then((data) => {
      res.status(200).json({
        results: data,
      });
    })

    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
};
exports.addUser = async (req, res, next) => {
  let image = JSON.stringify(req.file.path);
  let user = new User(
    _.pick(req.body, [
      "company",
      "role",
      "first_name",
      "last_name",
      "mobile_number",
      "email",
      "password",
      "created_by",
      "modified_by",
    ])
  );
  user.profile_image = image;
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  //const token = jwt.sign({ _id: user.id }, process.env.SECRET_KEY);
  res.status(200).send("User Added Successfully");
};

//update user
exports.updateUser = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  User.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  let user = await User.findByIdAndUpdate({ _id: req.params.id }, req.body);
  res.status(200).json(user);
  await user.save();
};
//delete user
exports.deleteUser = async (req, res, next) => {
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid request");
  User.findByIdAndRemove({ _id: req.params.id })
    .then((doc) => {
      res.status(200).json({
        message: "User Deleted Successfully",
      });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
