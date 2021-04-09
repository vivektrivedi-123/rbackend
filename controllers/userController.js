const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const _ = require("lodash");

exports.getUser = async (req, res, next) => {
  let user = await User.find();
  if (!user) {
    res.status(404).send("User Not Found");
  } else {
    res.status(200).send(user);
  }
};
exports.getUserById = async (req, res, next) => {
  let user = await User.findById({ _id: req.params.id });
  if (!user) {
    res.status(400).send("User Not Found");
  } else {
    res.status(200).send(user);
  }
};
exports.addUser = async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(409).send("User Already Exists");
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
    res.status(200).send("User Added");
  }
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
  let id = await req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  User.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  User.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.deletedCount > 0) {
      res.status(200).send({ message: `Deleted ${result.deletedCount} item.` });
    } else {
      res.status(404).send(`Delete failed `);
    }
  });
};
