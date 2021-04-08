const Role = require("../models/role");
const mongoose = require("mongoose");
const _ = require("lodash");
exports.getRoles = async (req, res, next) => {
  let role = await Role.find();
  if (!role) {
    res.send("Not Found").status(404);
  } else {
    res.send(role);
  }
};
exports.getRolesByID = async (req, res, next) => {
  let role = await Role.findById({ _id: req.params.id });
  if (!role) {
    res.send("Invalid ID").status(404);
  } else {
    res.send(role);
  }
};
exports.addRoles = async (req, res, next) => {
  let role = await Role.findOne({ role_name: req.body.role_name });
  if (role) {
    res.send("Company Already Exists");
  } else {
    let roles = new Role(_.pick(req.body, ["role_id", "role_name"]));
    await roles.save();
    res.send("Registered");
  }
};
exports.updateRoles = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.send({ message: "Invalid request" });
  Role.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null)
      res.send({ message: "ID in the body is not matching ID in the URL" });
  });

  let update = await Role.findByIdAndUpdate({ _id: req.params.id }, req.body);
  res.json(update);
};
exports.deleteRoles = async (req, res, next) => {
  let id = await req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.send({ message: "Invalid request" });
  Role.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.send({ message: "Invalid id" });
  });
  Role.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.deletedCount > 0) {
      res.status(200).send({ message: `Deleted ${result.deletedCount} role.` });
    } else {
      console.log("Could not delete a role");
      res.status(200).send(`Delete failed `);
    }
  });
};
