const { body, validation } = require("express-validator");

const userValidation = () => {
  return [
    body("first_name").isLength({ min: 3, max: 15 }),
    body("last_name").isLength({ min: 3, max: 15 }),
    body("mobile_number").isMobilePhone(),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ];
};
const validate = (req, res, next) => {
  const errors = validation(req);
  if (errors.isEmpty()) {
    return next();
  }
  const userError = [];
  errors.array().map((err) => userError.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: userError,
  });
};

module.exports = { userValidation, validate };
