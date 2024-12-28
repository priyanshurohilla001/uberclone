const express = require("express");
const router = express.Router();
const { query, body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");
const mapsController = require("../controllers/maps.controller");

router.get(
  "/get-coordinates",
  query("address")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Address must be a string with at least 3 characters"),
  authMiddleware.authUser,
  mapsController.getAddressCoordinates
);

router.get(
  "/get-distance-time",
  [
    query("origin")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Origin must be a string with at least 3 characters"),
    query("destination")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Destination must be a string with at least 3 characters"),
  ],
  authMiddleware.authUser,
  mapsController.getDistTime
);

router.get(
  "/get-suggestions",
  query("input")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Address must be a string with at least 3 characters"),
  authMiddleware.authUser,
  mapsController.getSuggestions
);

module.exports = router;
