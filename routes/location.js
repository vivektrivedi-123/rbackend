const locationController = require("../controllers/locationController");
const express = require("express");
const _ = require("lodash");
const router = express.Router();
const Location = require("../models/location");

router.get("/api/v1/location", fieldController.getLocation);

router.get("/api/v1/location/:id", fieldController.getLocationById);

router.post("/api/v1/location", fieldController.addLocation);

router.put("/api/v1/location/:id", fieldController.updateLocation);

router.delete("/api/v1/location/:id", fieldController.deleteLocation);
module.exports = router;
