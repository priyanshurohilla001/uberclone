import { validationResult } from "express-validator";
import { createRide, getfare } from "../services/ride.service.js";
import {
  getAddressCoordinates,
  getCaptainInArea,
} from "../services/maps.service.js";
import { io } from "../server.js";
import rideModal from "../modals/ride.modal.js";
import userModel from "../modals/user.modal.js";

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
    const captains = await getCaptainInArea({
      lat: originCoordinates.lat,
      lng: originCoordinates.lng,
      vehicleType,
    });

    // if no captain found
    if (captains.length == 0) {
      return res
        .status(404)
        .json({ msg: "No captain is available near you at this moment" });
    }

    // create a ride in pending state and update all the captains about availability
    const ride = await createRide({ user, origin, destination, vehicleType });

    const { otp, ...rideWithoutOtp } = ride.toObject();

    const rideData = { ...rideWithoutOtp, user };

    captains.forEach((captain) => {
      io.to(captain.socketId).emit("ridesInArea", rideData);
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

  async function accepted() {
    try {
      const ride = await rideModal
        .findOneAndUpdate(
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
        )
        .select("+otp");

      if (!ride) {
        return res.status(404).json({
          msg: "Could not accept ride. Please check ride ID or status.",
        });
      }

      const rideData = ride.toObject();
      const userId = rideData.user;
      const user = await userModel.findById(userId);

      console.log(rideData)

      io.to(user.socketId).emit("updateUserRide", { ...rideData, captain });

      rideData.otp = null;

      return res.status(200).json({ ...rideData, user });
    } catch (error) {
      console.error("Error accepting ride:", error);
      return res
        .status(500)
        .json({ error: "Unable to accept ride at this time." });
    }
  }

  async function ongoing() {
    try {
      const { otp } = req.body;
      if (!otp) {
        return res
          .status(400)
          .json({ msg: "OTP is required to start the ride." });
      }

      const ride = await rideModal.findOneAndUpdate(
        {
          _id: rideId,
          status: "accepted",
          otp,
          captain: captain._id,
        },
        {
          status: "ongoing",
        },
        {
          new: true,
        }
      );

      if (!ride) {
        return res.status(404).json({
          msg: "Could not start ride. Please check ride ID, status, or OTP.",
        });
      }

      const rideData = ride.toObject();
      const userId = rideData.user;
      const user = await userModel.findById(userId);

      io.to(user.socketId).emit("updateUserRide", { ...rideData, user });

      return res.status(200).json({ ...rideData, user });
    } catch (error) {
      console.error("Error starting ride:", error);
      return res
        .status(500)
        .json({ error: "Unable to start ride at this time." });
    }
  }

  async function completed() {
    try {
      const ride = await rideModal.findOneAndUpdate(
        {
          _id: rideId,
          status: "ongoing",
        },
        {
          status: "completed",
        },
        {
          new: true,
        }
      );

      if (!ride) {
        return res.status(404).json({
          msg: "Could not complete ride. Please check the ride ID or status.",
        });
      }

      const rideData = ride.toObject();
      const userId = rideData.user;
      const user = await userModel.findById(userId);

      io.to(user.socketId).emit("updateUserRide", { ...rideData, captain });

      return res.status(200).json({ ...rideData, user });
    } catch (error) {
      console.error("Error completing ride:", error);
      return res
        .status(500)
        .json({ error: "Unable to complete ride at this time." });
    }
  }

  async function cancelled() {
    try {
      const ride = await rideModal.findOneAndUpdate(
        {
          _id: rideId,
          captain: captain._id,
          status: ["accepted", "ongoing"],
        },
        {
          status: "cancelled",
        },
        {
          new: true,
        }
      );

      if (!ride) {
        return res.status(404).json({
          msg: "Could not cancel ride. Please check the ride ID or status.",
        });
      }

      const rideData = ride.toObject();
      const userId = rideData.user;
      const user = await userModel.findById(userId);

      io.to(user.socketId).emit("Cancelled", "Ride cancelled by captain.");

      return res.status(200).json({ ...rideData, user });
    } catch (error) {
      console.error("Error cancelling ride:", error);
      return res
        .status(500)
        .json({ error: "Unable to cancel ride at this time." });
    }
  }

  switch (status) {
    case "accepted":
      return accepted();
    case "ongoing":
      return ongoing();
    case "completed":
      return completed();
    case "cancelled":
      return cancelled();
    default:
      return res.json({
        msg: "Valid status are accepted , ongoing , completed , cancelled ",
      });
  }
}

export async function captainCurrentRide(req, res) {
  const captain = req.captain._id;

  try {
    const ride = await rideModal
      .findOne({
        captain: captain._id,
        status: ["accepted", "ongoing"],
      })
      .lean();

    if (!ride) {
      return res
        .status(200)
        .json({ msg: "Captain have no current active ride" });
    }

    const user = await userModel.findById(ride.user).lean();

    const rideData = { ...ride, user };

    return res.status(200).json(rideData);
  } catch (error) {
    return res.status(400).json({ errors: error.message });
  }
}

export async function userLookingForCaptainController(req, res) {
  const user = req.user;

  try {
    const ride = await rideModal
      .findOne({ user: user._id, status: "pending" })
      .lean();

    if (!ride) {
      return res
        .status(404)
        .json({ msg: "You have no ride with pending captain" });
    }

    const { radMul, createdAt, origin, vehicleType } = ride;
    const diffInSeconds = Math.floor((Date.now() - new Date(createdAt)) / 1000);

    if (radMul >= 3 && diffInSeconds >= 90) {
      await rideModal.findByIdAndUpdate(ride._id, { status: "cancelled" });
      return res.status(404).json({
        msg: "We are unable to find captains near you so we cancelled your ride",
        cancelled: true,
      });
    }

    if (
      (diffInSeconds >= 30 && radMul === 1) ||
      (diffInSeconds >= 60 && radMul === 2)
    ) {
      const newRadMul = radMul + 1;
      const response = await rideModal.findByIdAndUpdate(
        ride._id,
        {
          radMul: newRadMul,
        },
        {
          new: true,
        }
      );

      const originCoordinates = await getAddressCoordinates(origin);
      const captains = await getCaptainInArea({
        lat: originCoordinates.lat,
        lng: originCoordinates.lng,
        vehicleType,
        radMul: newRadMul,
      });

      const rideData = response.toObject();

      captains.forEach((captain) => {
        io.to(captain.socketId).emit("ridesInArea", { ...rideData, user });
      });

      return res.status(200).json({ ...rideData, user });
    }

    return res.status(429).json({
      msg: "Too many requests",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
}

export async function userCancelRideController(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }

  const user = req.user;
  const { rideId } = req.body;

  try {
    const ride = await rideModal.findOneAndUpdate(
      {
        _id: rideId,
        user: user._id,
        status: ["pending","accepted", "ongoing"],
      },
      {
        status: "cancelled",
      },
      {
        new: true,
      }
    );

    if (!ride) {
      return res.status(404).json({
        msg: "Could not cancel ride. Please check the ride ID or status.",
      });
    }

    return res.status(200).json({msg : "Ride cancelled successfully",success : true });
  } catch (error) {}
}
