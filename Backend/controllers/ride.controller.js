import { validationResult } from "express-validator";
import { createRide, getfare } from "../services/ride.service.js";
import {
  getAddressCoordinates,
  getCaptainInArea,
} from "../services/maps.service.js";
import { io } from "../server.js";
import captainModel from "../modals/captain.modal.js";
import rideModal from "../modals/ride.modal.js";

export async function createRideController(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = req.user;

  const { origin, destination, vehicleType } = req.body;

  try {
    const ride = await createRide({
      user,
      origin,
      destination,
      vehicleType,
    });

    res.status(201).json(ride);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getFareController(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { origin, destination } = req.query;

  try {
    const fare = await getfare(origin, destination);
    res.status(200).json(fare);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function searchRideController(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { origin, destination, vehicleType } = req.body;

  const user = req.user;

  try {
    const originCoordinates = await getAddressCoordinates(origin);

    // finding captains near location
    const captains = await getCaptainInArea(
      originCoordinates.lat,
      originCoordinates.lng,
      vehicleType
    );

    // if no captain found
    if (captains.length == 0) {
      return res
        .status(404)
        .json({ msg: "No captain is available near you at this moment" });
    }

    // create a ride in pending state and update all the captains about availability
    const ride = await createRide({ user, origin, destination, vehicleType });

    const { otp, ...rideWithoutOtp } = ride.toObject();

    captains.forEach((captain) => {
      io.to(captain.socketId).emit("ridesInArea", {
        rideWithoutOtp,
        user,
      });
    });

    return res.status(200).json(rideWithoutOtp);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
}

export async function changeStatusTo(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const captain = req.captain;
  const { rideId, status } = req.query;

  console.log(captain);
  console.log(rideId);

  async function accepted() {
    const ride = await rideModal.findOneAndUpdate(
      {
        _id: rideId,
        status: "pending",
      },
      {
        captain: captain._id,
        status: "accepted",
      },
      {
        new: true,
      }
    ).select("+otp");

    if (!ride) {
      return res
        .status(404)
        .json({ msg: "ride id and current status doesnt match" });
    } else {
      return res.status(200).json(ride);
    }
  }

  async function ongoing() {}

  switch (status) {
    case "accepted":
      return accepted();
    case "ongoing":
      return ongoing();
    case "completed":
      return res.json({ status: 3 });
    case "cancelled":
      return res.json({ status: 4 });
    default:
      return res.json({
        msg: "Valid status are accepted , ongoing , completed , cancelled ",
      });
  }
}
