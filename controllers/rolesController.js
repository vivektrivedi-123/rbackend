const Role = require("../models/role");
const mongoose = require("mongoose");
const _ = require("lodash");
exports.getRoles = async (req, res, next) => {
  let role = await Role.find();
  if (!role) {
    res.status(404);
  } else {
    res.send(role);
  }
};
exports.getRolesByID = async (req, res, next) => {
  let role = await Role.findById({ _id: req.params.id });
  if (!role) {
    res.status(400);
  } else {
    res.send(role);
  }
};
exports.addRoles = async (req, res, next) => {
  let role = await Role.findOne({ role_name: req.body.role_name });
  if (role) {
    res.status(409);
  } else {
    let roles = new Role(_.pick(req.body, ["role_id", "role_name"]));
    await roles.save();
    res.send("Registered");
  }
};
exports.updateRoles = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0) res.status(400);
  Role.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400);
  });
  let update = await Role.findByIdAndUpdate({ _id: req.params.id }, req.body);
  res.json(update);
};

exports.deleteRoles = async (req, res, next) => {
  let id = await req.params.id;
  if (!req.params.id || req.params.id < 0) res.status(400);
  Role.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400);
  });
  Role.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.deletedCount > 0) {
      res.status(200);
    } else {
      res.status(401);
    }
  });
};
