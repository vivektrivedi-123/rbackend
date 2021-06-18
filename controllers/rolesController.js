const Role = require("../models/role");
const mongoose = require("mongoose");
const _ = require("lodash");

exports.getRoles = async (req, res, next) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);
  try {
    let role = await Role.find().skip(skip).limit(limit).select(" -__v");
    if (!role) {
      res.status(404).send("Role Not Found");
    } else {
      res.status(200).send(role);
    }
  } catch (error) {
    res.status(500).json({message:error.message})
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
    res.status(500).json({message:error.message});
  }
};

exports.addRoles = async (req, res, next) => {
  try {
  let roles = new Role(_.pick(req.body, ["role_name"]));
  await roles.save();
  res.status(200).json({ message: "Role Added ", roles });
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

exports.putRoles = async (req, res, next) => {
  Role.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  try {
    let update = await Role.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true
    });
    await update.save();
    res.status(200).send(update);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

exports.patchRoles = async (req, res, next) => {
  Role.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  try {
    let update = await Role.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true
    });
    await update.save();
    res.status(200).send(update);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

exports.deleteRoles = async (req, res, next) => {
 try {
   let role = await Role.findByIdAndDelete({_id:req.params.id})
   if(role){
     res.status(200).json({message:"role deleted successfully"})
   } else{
     res.status(400).json({message:"role not found"})
   }
 } catch (error) {
   res.status(500).json({message:error.message})
 }
};
