const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const _ = require("lodash");

exports.getUser = async (req, res, next) => {
  let user = await User.find();
  if (!user) {
    res.status(404);
  } else {
    res.send(user);
  }
};
exports.getUserById = async (req, res, next) => {
  let user = await User.findById({ _id: req.params.id });
  if (!user) {
    res.status(400);
  } else {
    res.send(user);
  }
};
exports.addUser = async (req, res, next) => {
  let user = await User.findOne({ user_id: req.body.user_id });
  if (user) {
    res.status(409);
  } else {
    let users = new User(
      _.pick(req.body, [
        "user_id",
        "company_id",
        "role_id",
        "first_name",
        "last_name",
        "mobile_number",
        "email",
        "password",
        "token",
        "profile_image",
        "created_by",
        "modified_by",
      ])
    );
    const salt = await bcrypt.genSalt(10);
    users.password = await bcrypt.hash(users.password, salt);

    await users.save();
    res.status(200);
  }
};
exports.updateUser = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0) res.status(400);
  User.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400);
  });

  let user = await User.findByIdAndUpdate({ _id: req.params.id }, req.body);
  res.json(user);
  await user.save();
};
exports.deleteUser = async (req, res, next) => {
  let id = await req.params.id;
  if (!req.params.id || req.params.id < 0) res.status(400);
  User.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400);
  });
  User.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.deletedCount > 0) {
      res.status(200);
    } else {
      res.status(401);
    }
  });
};
