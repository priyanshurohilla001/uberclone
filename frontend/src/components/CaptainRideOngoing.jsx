import React, { useState } from "react";
import { Button } from "./ui/button";
import CaptainCancelRideButton from "./CaptainCancelRideButton";
import { Loader2 } from "lucide-react";
import formatTimeAgo from "@/utils/formatTimeAgo";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { handleError } from "@/utils/errorHandler";

const CaptainRideOngoing = ({ ride, setRide }) => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const onComplete = async () => {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const rideId = ride._id;
    const token = localStorage.getItem("captainToken");

    setIsButtonLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/rides/changestatusTo?status=completed&rideId=${rideId}`,
        {},
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );

      if (res.status == 200) {
        toast.success("Ride Completed");
        setRide((prev) => ({ ...prev, status: "completed" }));
        return;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Error Completing ride :",error);
        handleError(error)
      }
    } finally {
      setIsButtonLoading(false);
    }
  };

  return (
    <div className="bottom-0 bg-white  rounded-t-2xl  absolute w-full  min-h-48 shadow-2xl ">
      <div className="w-full bg-black text-white rounded-t-2xl p-4 flex justify-between items-center">
        <div className="flex justify-between gap-3">
          <div className="bg-slate-700 size-8 rounded-full flex items-center justify-center">
            <h3 className="capitalize text-lg ">
              {ride &&
                ride.user &&
                ride.user.fullname &&
                ride.user.fullname.firstname[0]}
            </h3>
          </div>
          <div className="flex flex-col">
            <h5>
              {ride?.user?.fullname?.firstname} {ride?.user?.fullname?.lastname}
            </h5>
            <h6 className="text-xs font-light text-slate-100">
              {ride?.user?.email}
            </h6>
          </div>
        </div>
        <h3 className="text-2xl font-semibold">₹ {ride && ride.fare}</h3>
      </div>
      <h3 className="w-full text-right text-sm mt-1 text-slate-900 px-2 pb-2">
        Created {formatTimeAgo(ride?.createdAt)}
      </h3>
      <div className="px-6 pb-6 flex flex-col items-center gap-3 justify-center w-full ">
        <h3 className="text-xl font-semibold">Complete Your Ride</h3>
        <div className="relative gap-y-2">
          <h3 className="text-xs mb-5">
            <span className="font-semibold : text-sm">To : </span>
            {ride && ride.destination}
          </h3>
        </div>

        <Button size="lg" onClick={onComplete}>
          {isButtonLoading ? (
            <>
              <Loader2 className="animate-spin" />
              Please wait
            </>
          ) : (
            "Complete"
          )}
        </Button>
        <CaptainCancelRideButton ride={ride} />
      </div>
    </div>
  );
};

export default CaptainRideOngoing;
