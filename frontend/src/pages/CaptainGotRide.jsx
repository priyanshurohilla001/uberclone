import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import SpinLoaderPage from "../components/SpinLoaderPage";

const CaptainGotRide = () => {
  const [ride, setRide] = useState(null);

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
        toast.error(error.message);
        console.error("Error fetching current ride:", error.message);
      }
    })();
  }, []);

  if (!ride) return <SpinLoaderPage />;
  console.log(ride);

  if (ride.status == "accepted") return <CaptainRideAccepted ride={ride} />;

  return <div>CaptainGotRide</div>;
};

function CaptainRideAccepted({ ride }) {
  return (
    <div className="bg-slate-100 w-screen h-screen">
      <div className="bottom-0 bg-white  rounded-t-2xl  absolute w-full min-h-48 p-4 shadow-2xl">
        ride is accepted
      </div>
    </div>
  );
}

export default CaptainGotRide;
