import React, { useContext, useEffect, useState } from "react";
import { CaptainContextData } from "../contexts/CaptainContext";
import toast, { Toaster } from "react-hot-toast";
import { socket } from "../socket";
import axios from "axios";
import SpinLoaderPage from "../components/SpinLoaderPage";

const CaptainHome = () => {
  // const { captain, setcaptain } = useContext(CaptainContextData);
  const [socketId, setsocketId] = useState(null);

  const [rides, setrides] = useState([]);

  useEffect(() => {
    function onConnect() {
      setsocketId(socket.id);
    }

    function ridesInArea(rideData) {
      setrides((prev) => [...prev, rideData]);
    }

    socket.on("connect", onConnect);
    socket.on("ridesInArea", ridesInArea);

    let intervalId;

    if (socketId) {
      // getLocation(socketId);
      intervalId = setInterval(() => {
        getLocation(socketId);
      }, 10 * 1000);
    }

    return () => {
      clearInterval(intervalId);
      socket.off("connect", onConnect);
      socket.off("ridesInArea", ridesInArea);
    };
  }, [socketId]);

  if (!socketId) return <SpinLoaderPage />;
  return (
    <div>
      <Toaster />
      <div>CaptainHome</div>
      <ol>
        {rides &&
          rides.map((ride, ind) => (
            <li key={ind}>
              {ride.origin} to {ride.destination}
            </li>
          ))}
      </ol>
    </div>
  );
};

const getLocation = async (socketId) => {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
        updateLocationSocket(socketId, latitude, longitude);
      },
      (err) => {
        toast.error("Error getting user location ");
        console.error(err);
      }
    );
  } else {
    toast.error("Geolocation is not supported by this browser");
  }
};

const updateLocationSocket = async (socketId, lat, lng) => {
  if (!socketId || !lat || !lng) {
    throw new Error(
      "Socket id and location are compulsory fields to perform this action"
    );
  }

  const serverUrl = import.meta.env.VITE_SERVER_URL;

  try {
    const res = await axios.post(
      `${serverUrl}/captains/updateLocationSocket`,
      {
        socketId,
        location: {
          lat,
          lng,
        },
      },
      {
        headers: {
          Authorization: `bearer ${localStorage.getItem("captainToken")}`,
        },
      }
    );

    if (res.status !== 200) {
      toast.error("Location is not updated");
    } else {
      toast.success("Location updated");
    }
  } catch (error) {
    toast.error("Error updating location");
    console.error(error);
  }
};

export default CaptainHome;
