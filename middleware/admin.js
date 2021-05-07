const role = require("../models/role");
const user = require("../models/user");
module.exports = function (req, res, next) {
  if (!req.role === Admin)
    return res.status(403).send("Access denied. Not Admin!!");
  next();
};
