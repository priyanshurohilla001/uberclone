import { getAddressCoordinates, getDistTime } from "./maps.service.js";
import captainModel from "../modals/captain.modal.js";
import rideModel from "../modals/ride.modal.js";

export const getfare = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }

  try {
    const originCord = await getAddressCoordinates(origin);
    const destinationCord = await getAddressCoordinates(destination);
    const distTime = await getDistTime(originCord, destinationCord);

    const dist = distTime.distance / 1000;
    const fare = {
      auto: Math.round(dist * 10),
      motorcycle: Math.round(dist * 5),
      car: Math.round(dist * 15),
    };
    return fare;
  } catch (error) {
    throw new Error(error.message);
  }
};

export async function createRide({ user, origin, destination, vehicleType }) {
  if (!user || !origin || !destination || !vehicleType) {
    throw new Error("User, origin, destination and VehicleType are required");
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  try {
    const fareAll = await getfare(origin, destination);

    const fare = fareAll[vehicleType];

    const ride = await rideModel.create({
      user: user._id,
      origin,
      destination,
      fare,
      otp,
    });

    return ride;
  } catch (error) {
    throw new Error(error.message);
  }
}

