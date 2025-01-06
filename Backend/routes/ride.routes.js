import { Router } from "express";
const router = Router();
import { query, body } from "express-validator";
import { authUser } from "../middlewares/auth.middleware.js";
import { createRideController, getFareController } from "../controllers/ride.controller.js";

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

export default router;
