import { validationResult } from "express-validator";
import captainModel from "../modals/captain.modal.js";
import { createCaptain } from "../services/captain.service.js";
import BlacklistTokenModel from "../modals/blacklistToken.modal.js";
import rideModal from "../modals/ride.modal.js";
import userModel from "../modals/user.modal.js";

export async function registerCaptainController(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  const isCaptainAlreadyExist = await captainModel.findOne({ email });

  if (isCaptainAlreadyExist) {
    return res.status(400).json({ message: "Captain already exists" });
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.firstname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = captain.generateAuthToken();

  res.status(201).json({ token, captain });
}

export async function loginCaptainController(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const captain = await captainModel.findOne({ email }).select("+password");

  if (!captain) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const comparePass = await captain.comparePassword(password);

  if (!comparePass) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = captain.generateAuthToken();

  captain.password = undefined;

  res.cookie("token", token);

  return res.status(200).json({ token, captain });
}

export async function getCaptainProfileController(req, res, next) {
  return res.status(200).json({ captain: req.captain });
}

export async function logoutCaptainController(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  await BlacklistTokenModel.create({ token });

  res.clearCookie("token");

  res.status(200).json({ message: "logout successfully" });
}

export async function updateLocationSocketController(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { socketId, location } = req.body;

  const id = req.captain._id;

  try {
    const captain = await captainModel.updateOne(
      { _id: id },
      {
        socketId: socketId,
        location: location,
      }
    );
  } catch (error) {
    return res.status(400).json({ errors: error });
  }

  return res
    .status(200)
    .json({ message: "Location and socket id updated Successfully" });
}

export async function captainAllRidesController(req, res) {
  const captain = req.captain;

  try {
    const rides = await rideModal
      .find({
        captain: captain._id,
        status: "completed",
      })
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .lean();

    return res.status(200).json(rides);
  } catch (error) {
    return res.status(500).json("Interval Server Error");
  }
}
