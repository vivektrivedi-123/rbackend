const Role = require("../models/role");
const mongoose = require("mongoose");
const _ = require("lodash");

exports.getRoles = async (req, res, next) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);
  let role = await Role.find().skip(skip).limit(limit).select(" -__v");
  if (!role) {
    res.status(404).send("Role Not Found");
  } else {
    res.status(200).send(role);
  }
};

exports.getRolesById = async (req, res, next) => {
  try {
    let role = await Role.findById({ _id: req.params.id }).select(" -__v");
    if (!role) {
      res.status(404).send("ID does not exists");
    } else {
      res.status(200).send(role);
    }
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
};

exports.addRoles = async (req, res, next) => {
  // let role = await Role.findOne({ role_name: req.body.role_name });
  // if (role) {
  //   res.status(409).send("Role Already Exists");
  // } else {
  let roles = new Role(_.pick(req.body, ["role_name"]));
  await roles.save();
  res.status(200).json({ message: "Role Added ", roles });
  //}
};

exports.putRoles = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  Role.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  let update = await Role.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  });
  await update.save();
  res.status(200).send(update);
};
exports.patchRoles = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  Role.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  let update = await Role.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  });
  await update.save();
  res.status(200).send(update);
};
exports.deleteRoles = async (req, res, next) => {
  let id = await req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  Role.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.send("Invalid Request").status(400);
  });
  Role.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.deletedCount > 0) {
      res.status(200).send({ message: `Deleted ${result.deletedCount} role.` });
    } else {
      res.status(404).send(`Delete failed `);
    }
  });
};
