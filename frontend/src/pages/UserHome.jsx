import RideCompleted from "@/components/RideCompleted";
import UserRideAccepted from "@/components/UserRideAccepted";
import UserRideOngoing from "@/components/UserRideOngoing";
import UserWaitingForCaptain from "@/components/UserWaitingForCaptain";
import { socket } from "@/socket";
import { handleError } from "@/utils/errorHandler";
import axios, { AxiosError } from "axios";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const [ride, setRide] = useState(null);
  const [socketId, setSocketId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    socket.connect();

    async function updateSocketLocation() {
      if (!socketId) return;
      try {
        const locParams = await currentLocation();
        const serverUrl = import.meta.env.VITE_SERVER_URL;
        const res = await axios.post(
          `${serverUrl}/users/updateLocationSocket`,
          { socketId, location: locParams },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (res.status === 200) toast.success("Location Updated Successfully");
      } catch (error) {
        handleError(error);
      }
    }

    function updateUserRide(data) {
      setRide(data);
    }

    function onConnect() {
      setSocketId(socket.id);
    }

    socket.on("updateUserRide", updateUserRide);
    socket.on("connect", onConnect);

    updateSocketLocation();

    const intervalId = setInterval(() => {
      updateSocketLocation();
    }, 30_000);

    (async () => {
      if (!socketId) return;
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/users/currentride`,
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setRide(res.data);
      } catch (error) {
        handleError(error);
      }
    })();

    return () => {
      socket.off("updateUserRide", updateUserRide);
      clearInterval(intervalId);
    };
  }, [socketId]);

  async function onLogout() {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/users/logout`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(res.data?.msg);

      setTimeout(() => {
        localStorage.removeItem("token");
        navigate("/login");
      }, 3000);
    } catch (error) {
      handleError(error);
    }
  }

  // if (!ride) {
  //   return <SpinLoaderPage />;
  // }

  return (
    <div className="flex h-[100vh] w-full relative  bg-cover object-cover bg-[url('https://miro.medium.com/v2/resize:fit:1400/format:webp/0*gwMx05pqII5hbfmX.gif')]">
      {ride?.status === "pending" ? (
        <UserWaitingForCaptain ride={ride} setRide={setRide} />
      ) : ride?.status === "accepted" ? (
        <UserRideAccepted ride={ride} />
      ) : ride?.status === "ongoing" ? (
        <UserRideOngoing ride={ride} />
      ) : ride?.status === "completed" ? (
        <RideCompleted />
      ) : null}

      <img
        src="./src/assets/uberLogoDark.png"
        className="absolute top-5 left-5 h-6 "
      />
      <button
        className="absolute top-5 right-5 bg-white p-3 rounded-full shadow hover:scale-105"
        onClick={onLogout}
      >
        <LogOut />
      </button>
    </div>
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

export default UserHome;
