const locationController = require("../controllers/locationController");
const express = require("express");
const _ = require("lodash");
const router = express.Router();
const Location = require("../models/location");

router.get("/api/v1/location", locationController.getLocation);

//router.get("/api/v1/location/:id", locationController.getLocationById);

router.post("/api/v1/location", locationController.addLocation);

router.put("/api/v1/location/:id", locationController.updateLocation);

router.delete("/api/v1/location/:id", locationController.deleteLocation);
module.exports = router;
