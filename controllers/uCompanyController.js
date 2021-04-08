const Comp = require("../models/company_users");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const _ = require("lodash");

exports.getUser = async (req, res, next) => {
  let comp = await Comp.find();
  if (!comp) {
    res.send("Not Found").status(404);
  } else {
    res.send(comp);
  }
};
exports.getUserById = async (req, res, next) => {
  let comp = await Comp.findById({ _id: req.params.id });
  if (!comp) {
    res.send("Invalid ID").status(404);
  } else {
    res.send(comp);
  }
};
exports.addUser = async (req, res, next) => {
  let comp = await Comp.findOne({ user_id: req.body.user_id });
  if (comp) {
    res.send("Company Already Exists");
  } else {
    let comps = new Comp(
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
    comps.password = await bcrypt.hash(comps.password, salt);

    await comps.save();
    res.send("Registered");
  }
};
exports.updateUser = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.send({ message: "Invalid request" });
  Comp.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null)
      res.send({ message: "ID in the body is not matching ID in the URL" });
  });

  let update = await Comp.findByIdAndUpdate({ _id: req.params.id }, req.body);
  res.json(update);
};
exports.deleteUser = async (req, res, next) => {
  let id = await req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.send({ message: "Invalid request" });
  Comp.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.send({ message: "Invalid id" });
  });
  Comp.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.deletedCount > 0) {
      res
        .status(200)
        .send({ message: `Deleted ${result.deletedCount} record.` });
    } else {
      console.log("Could not delete a record");
      res.status(200).send(`Delete failed `);
    }
  });
};
