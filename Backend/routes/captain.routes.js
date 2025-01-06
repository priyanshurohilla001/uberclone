import { Router } from "express";
const router = Router();
import { body } from "express-validator";
import { registerCaptainController, loginCaptainController, getCaptainProfileController, logoutCaptainController, updateLocationSocketController } from "../controllers/captain.controller.js";
import { authCaptain } from "../middlewares/auth.middleware.js";

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
  registerCaptainController
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be atleast 6 charcters"),
  ],
  loginCaptainController
);

router.get("/profile", authCaptain, getCaptainProfileController);

router.get("/logout", authCaptain, logoutCaptainController);

router.post(
  "/updateLocationSocket",
  [
    body("socketId").isLength({
      min: 20,
      max: 20,
    }).withMessage("Invalid Socket id"),
    body("location.lat").isNumeric({
      min : -90 ,
      max : 90
    }),
    body("location.lng").isNumeric({
      min : -180 ,
      max : 180
    })
  ],
  authCaptain,
  updateLocationSocketController
);

export default router;
