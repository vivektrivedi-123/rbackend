const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const User = require("../models/user");
const company = require("../models/company");
const Role = require("../models/role");
const { findOne } = require("../models/company");

//get
exports.getUser = async (req, res, next) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);
  const firstName = req.query.first_name;
  User.find()
    .skip(skip)
    .limit(limit)
    .select("-__v")
    .populate({
      path: "stage",
      select: "-__v -job",
      populate: {
        path: "stepStage",
        select: "-__v",
      },
    })
    .populate("company", "company_name ")
    .populate("role", "role_name ")
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

//get by ID
exports.getUserById = async (req, res, next) => {
  User.findById({ _id: req.params.id })
    .select(" -__v")
    .populate({
      path: "stage",
      select: "-__v -job ",
      populate: {
        path: "stageData",
        populate: {
          path: "stages",
        },
      },
    })
    .populate("company", "company_name ")
    .populate("role", "role_name ")
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
//user login
exports.userLogin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const company = JSON.stringify(req.body.company);
    const password = req.body.password;
    let user = await User.findOne({
      email: req.body.email,
      company: req.body.company,
    });
    if (!user) return res.status(404).send("User does not exists");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(403).send("Invalid  Password.");

    const token = jwt.sign({ _id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "10h",
    });
    res
      .header("Authorization", token)
      .header("Access-Control-Expose-Headers", "Authorization")
      .status(200);
    res.json(,token);
  } catch (error) {
    console.log(error);
  }
};

//add user
exports.addUser = async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
      return res.status(400).send('That user already exisits!');
  }else{
  try {
    let image = req.file.path;
    let user = new User(
      _.pick(req.body, [
        "company",
        "role",
        "first_name",
        "last_name",
        "mobile_number",
        "email",
        "password",
        "stage",
        "created_by",
        "modified_by",
      ])
    );
    user.profile_image = image;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({message:error.message});
  }
}
};

//put
exports.putUser = async (req, res, next) => {
  User.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  try {
    let image = req.file.path;
  let user = await User.findByIdAndUpdate({ _id: req.params.id },
    {
      first_name:req.body.first_name,
      last_name:req.body.last_name,
      mobile_number:req.body.mobile_number,
      email:req.body.email,
      profile_image:image
    },
    {new: true}
  );
  await user.save();
  res.status(200).send(user);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

//patch
exports.patchUser = async (req, res, next) => {
  User.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  }).select("-password");
  try {
    let image = JSON.stringify(req.file.path);
  let user = await User.findByIdAndUpdate({ _id: req.params.id },
    {
      first_name:req.body.first_name,
      last_name:req.body.last_name,
      mobile_number:req.body.mobile_number,
      email:req.body.email,
      profile_image:image
    },
    {new: true}
  );
  await user.save();
  res.status(200).send(user);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

//delete user
exports.deleteUser = async (req, res, next) => {
 try {
   const user = await User.findByIdAndDelete({_id:req.params.id})
   if(user) {
    res.status(200).json({message:"user deleted successfully"})
   } else {
     res.status(400).json({message:"user not found"})
   } 
 } catch (error) {
   res.status(500).json({message:error.message})
 }
};
