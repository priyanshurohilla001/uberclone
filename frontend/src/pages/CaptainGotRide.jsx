import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import SpinLoaderPage from "../components/SpinLoaderPage";
import CaptainRideAccepted from "@/components/CaptainRideAccepted";
import CaptainRideOngoing from "@/components/CaptainRideOngoing";
import CaptainAvailRidesSocket from "@/components/CaptainAvailRidesSocket";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RideCompleted from "@/components/RideCompleted";

const CaptainGotRide = () => {
  const [ride, setRide] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (error === null) return;
    toast.error(error);
    setError(null);
  }, [error]);

  useEffect(() => {
    const token = localStorage.getItem("captainToken");
    const serverUrl = import.meta.env.VITE_SERVER_URL;

    (async () => {
      try {
        const res = await axios.get(`${serverUrl}/captains/currentride`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        setRide(res.data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching current ride:", error.message);
      }
    })();
  }, []);

  function onLogout() {
    localStorage.removeItem("captainToken");
    navigate("/captain-login");
  }

  if (!ride) {
    return <SpinLoaderPage />;
  }

  return (
    <div className="flex h-[100vh] w-full relative  bg-cover object-cover bg-[url('https://miro.medium.com/v2/resize:fit:1400/format:webp/0*gwMx05pqII5hbfmX.gif')]">
      {ride?.status == "accepted" ? (
        <CaptainRideAccepted ride={ride} setRide={setRide} />
      ) : ride?.status == "ongoing" ? (
        <CaptainRideOngoing ride={ride} setRide={setRide} />
      ) : ride?.status == "completed" ? (
        <RideCompleted />
      ) : (
        <CaptainAvailRidesSocket setRide={setRide} />
      )}
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

export default CaptainGotRide;
