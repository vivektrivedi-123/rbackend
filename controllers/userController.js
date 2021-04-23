const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const User = require("../models/user");
const company = require("../models/company");
const role = require("../models/role");

exports.getUser = async (req, res, next) => {
  const pageSize = 20;
  const pageNumber = 1;
  User.find()
    .skip((pageNumber - 1) * pageSize)
    .limit(20)
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
      res.status(404).json(err);
    });
};
exports.getUserById = async (req, res, next) => {
  User.findById({ _id: req.params.id })
    .populate("company", "company_name -id")
    .populate("role", "role_name -_id")
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
exports.addUser = async (req, res, next) => {
  let user = new User(
    _.pick(req.body, [
      "company",
      "role",
      "first_name",
      "last_name",
      "mobile_number",
      "email",
      "password",
      "profile_image",
      "created_by",
      "modified_by",
    ])
  );

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  //const token = jwt.sign({ _id: user.id }, process.env.SECRET_KEY);
  res.status(200).send("User Added Successfully");
};
exports.userUploadImage = async (req, res, next) => {
  var obj = {
    profile_image: {
      data: fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.file.filename)
      ),
      contentType: "image/png",
    },
  };
  imgModel.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      item.save();
    }
  });
};

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
