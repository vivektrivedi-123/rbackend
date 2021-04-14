const jwt = require("jsonwebtoken");
module.exports = function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) res.status(401).send("Access denied.No token provided");
  try {
    const decoded = jwt.verify(req.headers.token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid Token");
  }
};
