import React from "react";
import rideCompletedAnimation from "../assets/rideCompletedAnimation.json";
import LottiePlayer from "./LottiePlayer";

const RideCompleted = () => {
  setTimeout(() => {
    window.location.reload();
  }, 4000);

  return (
    <div className="absolute top-0 left-0 h-full w-full z-10 flex justify-center items-center backdrop-brightness-50">
      <div className="w-11/12 max-w-96 rounded-sm flex flex-col justify-center items-center shadow p-10 bg-white">
        <LottiePlayer animation={rideCompletedAnimation} />
        <h3 className="text-2xl font-semibold text-center mt-4">
          Thank You <br></br> For having a ride !
        </h3>
      </div>
    </div>
  );
};

export default RideCompleted;
