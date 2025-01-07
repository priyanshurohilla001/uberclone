import axios from "axios";
import captainModel from "../modals/captain.modal.js";

export async function getAddressCoordinates(address) {
  if (!address) {
    throw new Error("Address is required");
  }

  const apiKey = process.env.OLA_MAPS_API;
  const url = `https://api.olamaps.io/places/v1/geocode?address=${address}&api_key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error("Error fetching data");
    }

    const data = response.data;

    const coordinates = {
      lat: data.geocodingResults[0].geometry.location.lat,
      lng: data.geocodingResults[0].geometry.location.lng,
    };

    return coordinates;
  } catch (error) {
    throw new Error("Error fetching data");
  }
}

export async function getDistTime(origin, destination) {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }
  const apiKey = process.env.OLA_MAPS_API;
  const url = `https://api.olamaps.io/routing/v1/distanceMatrix/basic?origins=${origin.lat},${origin.lng}&destinations=${destination.lat},${destination.lng}&api_key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error("Error fetching data");
    }

    const data = response.data.rows[0].elements[0];

    const distTime = {
      distance: data.distance,
      duration: data.duration,
    };

    return distTime;
  } catch (error) {
    throw new Error("Error fetching data");
  }
}

export async function getSuggestions(query, location) {
  if (!query) {
    throw new Error("Query is required");
  }

  const apiKey = process.env.OLA_MAPS_API;
  let url = `https://api.olamaps.io/places/v1/autocomplete?input=${query}&api_key=${apiKey}`;

  if (location && location.lat && location.lng) {
    url += `&radius=50000&location=${location.lat},${location.lng}`;
  }

  try {
    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error("Error fetching data");
    }

    const data = response.data.predictions;
    return data;
  } catch (error) {
    throw new Error("Error fetching data");
  }
}

export async function getCaptainInArea(lat, lng , vehicleType) {
  // Check if latitude and longitude are within valid ranges
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    throw new Error("Provide coordinates in a proper format");
  }

  try {
    const captains = await captainModel.find({
      "vehicle.vehicleType": vehicleType,
      location: {
        $geoWithin: {
          $centerSphere: [[lat, lng], 10 / 6378.1],
        },
      },
    });

    return captains;
  } catch (error) {
    throw new Error("Captains not available");
  }
}
