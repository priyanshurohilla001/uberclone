import userModel from "../modals/user.modal.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import BlacklistTokenModel from "../modals/blacklistToken.modal.js";
import captainModel from "../modals/captain.modal.js";
import rideModal from "../modals/ride.modal.js";

export async function registerUserController(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  const isUserExist = await userModel.findOne({ email });

  if (isUserExist) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await userModel.hashPassword(password);

  const user = await createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();

  res.status(201).json({ token, user });
}

export async function loginUserController(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = user.generateAuthToken();

  res.cookie("token", token);

  return res.status(200).json({ user, token });
}

export async function getUserProfileController(req, res, next) {
  return res.status(200).json(req.user);
}

export async function logoutUserController(req, res) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  try {
    await BlacklistTokenModel.create({ token });
    res.clearCookie("token");
    return res.status(200).json({ msg: "Logged out successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error blacklisting token", error: error.message });
  }
}

export async function userCurrentRideController(req, res) {
  const user = req.user;
  const userId = user._id;

  try {
    const ride = await rideModal
      .findOne({
        user: userId,
        status: ["pending", "accepted", "ongoing"],
      }).select("+otp")
      .lean();

    if (!ride) {
      return res.status(400).json({ msg: "User have no current active ride" });
    }

    const captain = await captainModel.findById(ride.captain).lean();

    const rideData = { ...ride, captain, user };

    return res.status(200).json(rideData);
  } catch (error) {
    return res.status(500).json({ errors: error.message });
  }
}

export async function updateLocationSocketController(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.user;
  const { socketId, location } = req.body;

  try {
    await userModel.updateOne(
      { _id: id },
      {
        socketId: socketId,
        location: location,
      }
    );

    return res
      .status(200)
      .json({ message: "Location and socket id updated Successfully" });
  } catch (error) {
    return res.status(400).json({ errors: error });
  }
}
