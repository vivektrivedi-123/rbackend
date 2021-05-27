const { body, validationResult } = require("express-validator");

const userValidation = () => {
  return [
    body("first_name").isLength({ min: 3, max: 20 }),
    body("last_name").isLength({ min: 3, max: 20 }),
    body("mobile_number").isMobilePhone().isLength(10),
    body("email").isEmail(),
    body("password").isLength({ min: 5 ,max:20}),
  ];
};
const validateSchema = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = { userValidation, validateSchema };
