const { validationResult } = require("express-validator");
const rideService = require("../services/ride.service");

module.exports.createRide = async ( req, res ) => {

  console.log("Reached Contoller ")

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = req.user._id;

  const { origin, destination, vehicleType } = req.body;

  try {
    const ride = await rideService.createRide({
      user,
      origin,
      destination,
      vehicleType,
    });

    res.status(201).json(ride);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
