import { handleError } from "@/utils/errorHandler";
import formatTimeAgo from "@/utils/formatTimeAgo";
import axios from "axios";
import { useEffect, useState } from "react";
import SpinLoaderPage from "./SpinLoaderPage";
import LookingForCaptainLottie from "./LookingForCaptainLottie";
import toast from "react-hot-toast";
import UserCancelRideButton from "./UserCancelRideButton";

const UserWaitingForCaptain = ({ ride }) => {
  const [pendingRide, setPendingRide] = useState(ride);

  useEffect(() => {
    async function lookingForCaptain(){
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/rides/lookingForCaptain`,
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setPendingRide(res.data);
      } catch (error) {
        if(error?.response?.cancelled){
          toast.error(error.response.msg)
            setTimeout(() => {
            window.location.reload();
            }, 2000);
        }
        handleError(error);
      }
    };

    lookingForCaptain()

    const intervalId = setInterval(() => {
      lookingForCaptain()
    }, 20000);

    return ()=>{
      clearInterval(intervalId)
    }

  }, []);

  if (!pendingRide) return <SpinLoaderPage />;

  const { origin, destination, createdAt, fare, user  } = pendingRide;
  const { email } = user;
  const { firstname, lastname } = user.fullname;


  return (
    <div className="bottom-0 bg-white rounded-t-2xl absolute w-full  min-h-96 shadow-2xl transition-all ease-in-out delay-200">
      {/* Header  */}
      <div className="w-full bg-black text-white rounded-t-2xl p-4 flex justify-between items-center">
        <div className="flex justify-between gap-3">
          <div className="bg-slate-700 size-8 rounded-full flex items-center justify-center">
            <h3 className="capitalize text-lg ">{firstname[0]}</h3>
          </div>
          <div className="flex flex-col">
            <h5>
              {firstname} {lastname}
            </h5>
            <h6 className="text-xs font-light text-slate-100">{email}</h6>
          </div>
        </div>
        <h3 className="text-2xl font-semibold">₹ {fare}</h3>
      </div>
      <h3 className="w-full text-right text-sm mt-1 text-slate-900 px-2 pb-2">
        Created {formatTimeAgo(createdAt)}
      </h3>
      {/* Content   */}
      <div className="px-6 pb-6 flex flex-col items-center gap-3 justify-center w-full">
        <h3 className="text-xl font-semibold">Looking For a driver</h3>
        {/* From and To  */}
        <div className="relative gap-y-2">
          <h3 className="text-xs">
            <span className="font-semibold text-sm">From: </span>
            {origin}
          </h3>
          <div className="h-[1.5px] bg-slate-200 w-full my-4" />
          <h3 className="text-xs">
            <span className="font-semibold text-sm">To: </span>
            {destination}
          </h3>
        </div>
        <LookingForCaptainLottie radMul={pendingRide.radMul}/>
        <UserCancelRideButton ride={pendingRide}/>
      </div>
    </div>
  );
};

export default UserWaitingForCaptain;
