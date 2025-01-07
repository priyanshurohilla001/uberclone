import React, { useContext, useEffect, useState } from "react";
import { CaptainContextData } from "../contexts/CaptainContext";
import toast, { Toaster } from "react-hot-toast";
import { socket } from "../socket";
import axios from "axios";
import SpinLoaderPage from "../components/SpinLoaderPage";
import CaptainAcceptReject from "../components/CaptainAcceptReject"

const CaptainHome = () => {
  // const { captain, setcaptain } = useContext(CaptainContextData);
  const [socketId, setSocketId] = useState(null);
  const [rides, setrides] = useState([]);

  useEffect(() => {
    // Handlers
    const onConnect = () => setSocketId(socket.id);

    const onRidesInArea = (rideData) => {
      setrides((prev) => [...prev, rideData]);
    };

    socket.on("connect", onConnect);
    socket.on("ridesInArea", onRidesInArea);

    let locationIntervalId;
    if (socketId) {
      requestAndUpdateLocation(socketId);
      locationIntervalId = setInterval(() => {
        requestAndUpdateLocation(socketId);
      }, 10 * 1000);
    }

    return () => {
      clearInterval(locationIntervalId);
      socket.off("connect", onConnect);
      socket.off("ridesInArea", onRidesInArea);
    };
  }, [socketId]);

  if (!socketId) {
    return <SpinLoaderPage />;
  }

  console.log(rides);
  return (
    <div className="relative flex flex-col justify-center items-center bg-slate-100 h-screen">
      <Toaster />
      <h2>Captain Home</h2>
      <ol>
        {rides.map((ride, index) => (
          <li key={index}>
            {ride.origin} to {ride.destination}
          </li>
        ))}
      </ol>
      <CaptainAcceptReject rides={rides} setrides={setrides}/>
    </div>
  );
};

// Request the user's location and update via socket/REST
const requestAndUpdateLocation = async (socketId) => {
  if (!navigator.geolocation) {
    toast.error("Geolocation is not supported by this browser.");
    return;
  }

  try {
    if (navigator.permissions && navigator.permissions.query) {
      const permissionStatus = await navigator.permissions.query({
        name: "geolocation",
      });
      if (permissionStatus.state === "denied") {
        toast.error("Location permission is denied. Please allow access.");
        return;
      }
    }

    // Get the current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Location :", latitude, longitude);
        updateLocationSocket(socketId, latitude, longitude);
      },
      (error) => {
        handleGeolocationError(error);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  } catch (err) {
    toast.error("Error checking location permissions.");
    console.error("Permission Check Error:", err);
  }
};

// Handle specific geolocation errors
const handleGeolocationError = (error) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      toast.error("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      toast.error("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      toast.error("Request to get user location timed out.");
      break;
    default:
      toast.error("An unknown error occurred while retrieving location.");
      break;
  }
  console.error("Geolocation Error:", error);
};

// Send location updates to the server
const updateLocationSocket = async (socketId, lat, lng) => {
  try {
    if (!socketId || !lat || !lng) {
      throw new Error("Socket ID and location are required.");
    }

    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const res = await axios.post(
      `${serverUrl}/captains/updateLocationSocket`,
      { socketId, location: { lat, lng } },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("captainToken")}`,
        },
      }
    );

    if (res.status !== 200) {
      toast.error("Location update failed.");
    } else {
      toast.success("Location updated successfully.");
    }
  } catch (error) {
    toast.error("Error updating location.");
    console.error("Update Location Error:", error);
  }
};

export default CaptainHome;
