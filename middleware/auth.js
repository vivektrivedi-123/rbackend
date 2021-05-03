const jwt = require("jsonwebtoken");
module.exports = function auth(req, res, next) {
  const token = req.header.authToken;

  if (token) {
    const token = token.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).send("Access denied.No token provided");
  }
};


// const token = req.header("x-auth-token");
// res.header('x-auth-token',token).status(200);
// if (!token) res.status(401).send("Access denied.No token provided");
// try {
//   const decoded = jwt.verify(req.headers.token, process.env.SECRET_KEY);
//   req.user = decoded;
//   req.user_id = decoded.user_id;
//   next();
// } catch (ex) {
//   res.status(400).send("Invalid Token");
// }
