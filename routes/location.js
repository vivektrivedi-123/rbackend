const locationController = require("../controllers/locationController");
const express = require("express");
const {
  locationValidation,
  validateSchema,
} = require("../validation/locationValidation");
const router = express.Router();
const Location = require("../models/location");

router.get("/api/v1/location", locationController.getLocation);

router.get("/api/v1/location/:id", locationController.getLocationById);

router.post(
  "/api/v1/location",
  locationValidation(),
  validateSchema,
  locationController.addLocation
);

router.put(
  "/api/v1/location/:id",
  locationValidation(),
  validateSchema,
  locationController.updateLocation
);

router.delete("/api/v1/location/:id", locationController.deleteLocation);
module.exports = router;
