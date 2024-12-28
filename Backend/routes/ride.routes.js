const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");
const rideController = require("../controllers/ride.controller");

router.post(
  "/create",
  [
    body("origin")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Origin must be a string with at least 3 characters"),
    body("destination")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Destination must be a string with at least 3 characters"),
    body("vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Vehicle type must be car, motorcycle or auto"),
  ],
  authMiddleware.authUser,
  rideController.createRide
);

module.exports = router;
