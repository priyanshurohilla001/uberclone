import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { socket } from "@/socket";
import toast from "react-hot-toast";
import axios from "axios";
import NewRideContainer from "./NewRideContainer";

const CaptainAvailRidesSocket = ({ setRide }) => {
  const [socketId, setSocketId] = useState(null);
  const [rides, setRides] = useState([]);

  useEffect(() => {
    socket.connect();

    const onConnect = () => setSocketId(socket.id);

    const onRidesInArea = (rideData) => setRides((prev) => [...prev, rideData]);

    async function updateSocketLocation() {
      if (!socketId) return;
      try {
        const locParams = await currentLocation();
        const serverUrl = import.meta.env.VITE_SERVER_URL;
        const res = await axios.post(
          `${serverUrl}/captains/updateLocationSocket`,
          { socketId, location: locParams },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("captainToken")}`,
            },
          }
        );

        if (res.status === 200) toast.success("Location Updated Successfully");
      } catch (error) {
        console.error(error);
      }
    }

    socket.on("connect", onConnect);
    socket.on("ridesInArea", onRidesInArea);

    updateSocketLocation();

    const intervalId = setInterval(() => {
      updateSocketLocation();
    }, 30_000);

    return () => {
      socket.off("ridesInArea", onRidesInArea);
      clearInterval(intervalId);
    };
  }, [socketId]);

  if (rides.length == 0) return null;

  return (
    <NewRideContainer setRide={setRide} rides={rides} setRides={setRides} />
  );
};

function currentLocation() {
  return new Promise((resolve, reject) => {
    const location = navigator.geolocation;

    location.getCurrentPosition(
      function (param) {
        const { latitude, longitude } = param.coords;
        // console.log("currentLocation fxn :", latitude, longitude);
        resolve({
          lat: latitude,
          lng: longitude,
        });
      },
      function error(err) {
        // err.code 1 : user denied permission
        if (err.code === 1) {
          toast.error(
            "Location access denied. Please enable it from your browser settings and refresh the page."
          );
        } else {
          toast.error("An error occurred while fetching location.");
        }
        reject(err);
      }
    );
  });
}

export default CaptainAvailRidesSocket;
