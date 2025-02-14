import { Router } from "express";
const router = Router();
import { query, body } from "express-validator";
import { authCaptain, authUser } from "../middlewares/auth.middleware.js";
import {
  captainCurrentRide,
  changeStatusTo,
  createRideController,
  getFareController,
  userLookingForCaptainController,
  userCancelRideController
} from "../controllers/ride.controller.js";

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
  authUser,
  createRideController
);


router.get(
  "/fare",
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
  authUser,
  getFareController
);

router.get("/lookingForCaptain", authUser, userLookingForCaptainController);

router.post(
  "/changeStatusTo",
  [
    query("status")
      .isIn(["accepted", "ongoing", "completed", "cancelled"])
      .withMessage(
        "Valid status are accepted , ongoing , completed , cancelled"
      ),
    query("rideId")
      .isString()
      .isLength({ min: 24, max: 24 })
      .withMessage("Send Proper ride id"),
  ],
  authCaptain,
  changeStatusTo
);

router.post(
  "/cancel",
  body("rideId").isString().isLength({ min: 24, max: 24 }),authUser , userCancelRideController
);

export default router;
