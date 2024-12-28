const rideModel = require("../modals/ride.modal.js");
const mapService = require("./maps.service.js");

async function getfare( origin, destination, vehicleType) {

  if (!origin || !destination || !vehicleType) {
    throw new Error("Origin, destination and VehicleType are required");
  }

  try {
    const originCord = await mapService.getAddressCoordinates(origin);
    const destinationCord = await mapService.getAddressCoordinates(destination);
    const distTime = await mapService.getDistTime(originCord, destinationCord);

    const dist = distTime.distance / 1000;
    let fare;
    switch (vehicleType) {
      case "auto":
      fare = Math.round(dist * 10);
      break;
      case "motorcycle":
      fare = Math.round(dist * 5);
      break;
      case "car":
      fare = Math.round(dist * 15);
      break;
      default:
      throw new Error("Invalid vehicle type");
    }
    return fare;
  } catch (error) {
    throw new Error(error.message);
  }
}



module.exports.createRide = async ({
  user,
  origin,
  destination,
  vehicleType,
}) => {
  if (!user || !origin || !destination || !vehicleType) {
    throw new Error("User, origin, destination and VehicleType are required");
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  try {
    const fare = await getfare( origin, destination, vehicleType );

    const ride = rideModel.create({
      user,
      origin,
      destination,
      fare,
      otp,
    });
    
    return ride;
  } catch (error) {
    throw new Error(error.message);
  }
};


