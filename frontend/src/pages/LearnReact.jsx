import React, { useContext, useEffect, useState } from "react";
import { CaptainContextData } from "../contexts/CaptainContext";
import toast, { Toaster } from "react-hot-toast";
import { socket } from "../socket";
import axios from "axios";
import SpinLoaderPage from "../components/SpinLoaderPage";

const CaptainHome = () => {
  const { captain, setcaptain } = useContext(CaptainContextData);
  const [socketId, setsocketId] = useState(null);

  

  // console.log("before", socketId);
  // console.log("top element");

  useEffect(() => {
    socket.on("connect", () => {
      setsocketId(socket.id);
    });
  }, []);

  console.log(socketId)

  // console.log("after", socketId);
  // console.log("bottom element");

  if (!socketId) return <SpinLoaderPage />;
  return (
    <div>
      <Toaster />
      <div>CaptainHome</div>
    </div>
  );
};

const getLocation = () => {
  if (!socket.connected) {
    console.log("connecting after disconnection");
    socket.connect();
    console.log(socket.connected);
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
        if (!socket.id) {
          toast.error("Socket id error");
          return;
        }
        updateLocationSocket(socket.id, latitude, longitude);
      },
      (err) => {
        toast.error("Error getting user location");
      }
    );
  } else {
    toast.error("Geolocation is not supported by this browser");
  }
};

const updateLocationSocket = async (socketId, lat, lng) => {
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
  }
};

export default CaptainHome;
