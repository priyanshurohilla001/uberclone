import { Router } from "express";
const router = Router();
import { query, body } from "express-validator";
import { authUser } from "../middlewares/auth.middleware.js";
import { getAddressCoordinatesController, getDistTimeController, getSuggestionsController } from "../controllers/maps.controller.js";

router.get(
  "/get-coordinates",
  query("address")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Address must be a string with at least 3 characters"),
  authUser,
  getAddressCoordinatesController
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
  authUser,
  getDistTimeController
);

router.get(
  "/get-suggestions",
  query("input")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Address must be a string with at least 3 characters"),
  authUser,
  getSuggestionsController
);

export default router;
