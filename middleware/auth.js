const jwt = require("jsonwebtoken");
module.exports = function auth(req, res, next) {
  try {
    const authHeader = req.header("Authorization");
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
          return res.status(403).send("Token Expired");
        } else {
          req.user = user;
          req.user.role === "Admin";
          next();
        }
      });
    } else {
      res.status(401).send("Access denied.Not Authorized");
    }
  } catch (err) {
    console.log(err);
  }
};
