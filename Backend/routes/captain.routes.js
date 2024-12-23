const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controllers/captain.controller");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("first name must be atleast 3 characters"),
    body("fullname.lastname")
      .isLength({ min: 3 })
      .optional()
      .withMessage("last name must be atleast 3 characters"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be atleast 6 charcters"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("vehicle color must be atleast 3 characters"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("vehicle plate must be atleast 3 characters"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Vehicle capacity must be atleast 1"),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid type of vehicle"),
  ],
  captainController.registerCaptain
);

module.exports = router;
