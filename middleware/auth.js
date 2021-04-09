const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = jwt.verify(req.headers.authtoken, process.env.SECRET_KEY);
    req.users = token;

    next();
  } catch (err) {
    res.status(401).json({
      message: "Authentication Failed",
      err: err,
    });
  }
};
