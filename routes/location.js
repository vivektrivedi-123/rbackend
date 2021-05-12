const locationController = require("../controllers/locationController");
const express = require("express");
const {
  locationValidation,
  validateSchema,
} = require("../validation/locationValidation");
const router = express.Router();
const auth = require("../middleware/auth");
const Location = require("../models/location");

router.get("/api/v1/location", auth, locationController.getLocation);

router.get("/api/v1/location/:id", auth, locationController.getLocationById);

router.post(
  "/api/v1/location",
  auth,
  locationValidation(),
  validateSchema,
  locationController.addLocation
);

router.put(
  "/api/v1/location/:id",
  auth,
  locationValidation(),
  validateSchema,
  locationController.updateLocation
);

router.delete("/api/v1/location/:id", auth, locationController.deleteLocation);
module.exports = router;
