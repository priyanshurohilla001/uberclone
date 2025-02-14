import { Router } from "express";
const router = Router();
import { body } from "express-validator";
import {
  registerUserController,
  loginUserController,
  getUserProfileController,
  logoutUserController,
  userCurrentRideController,
  updateLocationSocketController
} from "../controllers/user.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First Name must be atleast 3 characters"),
    body("fullname.lastname")
      .isLength({ min: 3 })
      .optional()
      .withMessage("Last Name must be atleast 3 characters"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  registerUserController
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  loginUserController
);

router.get("/profile", authUser, getUserProfileController);

router.post("/logout", authUser, logoutUserController);

router.get("/currentride", authUser, userCurrentRideController);

router.post(
  "/updateLocationSocket",
  [
    body("socketId")
      .isLength({
        min: 20,
        max: 20,
      })
      .withMessage("Invalid Socket id"),
    body("location.lat").isNumeric({
      min: -90,
      max: 90,
    }),
    body("location.lng").isNumeric({
      min: -180,
      max: 180,
    }),
  ],
  authUser,
  updateLocationSocketController
);

export default router;
