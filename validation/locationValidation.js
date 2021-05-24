const { body, validationResult } = require("express-validator");

const locationValidation = () => {
  return [
    body("location_address").isLength({ min: 5, max: 50 }),
    body("location_name").isLength({ min: 10, max: 20 }),
    body("location_city").isLength({ min: 3, max: 10 }),
    body("location_state").isLength({ min: 3, max: 20 }),
    body("postal_code").isPostalCode("IN"),
    body("country").isLength({ min: 2, max: 20 }),
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

module.exports = { locationValidation, validateSchema };
