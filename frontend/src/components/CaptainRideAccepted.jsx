import { useEffect, useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { Button } from "./ui/button";
import { Ghost, Loader2 } from "lucide-react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import CaptainCancelRideButton from "./CaptainCancelRideButton";
import formatTimeAgo from "@/utils/formatTimeAgo";
import { handleError } from "@/utils/errorHandler";

// Constants for status messages
const STATUS_MESSAGES = {
  RIDE_CONFIRMED: "Ride Confirmed",
  OTP_REQUIRED: "OTP is required",
  VERIFYING_RIDE: "Verifying ride...",
  VERIFY: "Verify",
  ERROR_VERIFYING_RIDE: "Error verifying ride. Please try again.",
};

const CaptainRideAccepted = ({ ride, setRide }) => {
  const [otp, setOtp] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const onVerify = async () => {
    if (otp.length !== 6) {
      toast.error(STATUS_MESSAGES.OTP_REQUIRED);
      return;
    }

    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const rideId = ride._id;
    const token = localStorage.getItem("captainToken");

    setIsButtonLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/rides/changestatusTo?status=ongoing&rideId=${rideId}`,
        { otp },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success(STATUS_MESSAGES.RIDE_CONFIRMED);
        setRide((prev) => ({ ...prev, status: "ongoing" }));
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error verifying ride:", error);
        handleError(error);
      }
    } finally {
      setIsButtonLoading(false);
      setOtp("");
    }
  };

  return (
    <div className="bottom-0 bg-white rounded-t-2xl absolute w-full min-h-48 shadow-2xl">
      <div className="w-full bg-black text-white rounded-t-2xl p-4 flex justify-between items-center">
        <div className="flex justify-between gap-3">
          <div className="bg-slate-700 size-8 rounded-full flex items-center justify-center">
            <h3 className="capitalize text-lg ">
              {ride?.user?.fullname?.firstname[0]}
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
        <h3 className="text-2xl font-semibold">₹ {ride?.fare}</h3>
      </div>
      <h3 className="w-full text-right text-sm mt-1 text-slate-900 px-2 pb-2">
        Created {formatTimeAgo(ride?.createdAt)}
      </h3>
      <div className="px-6 pb-6 flex flex-col items-center gap-3 justify-center w-full">
        <h3 className="text-xl font-semibold">Confirm Your Ride</h3>
        <div className="relative gap-y-2">
          <h3 className="text-xs">
            <span className="font-semibold text-sm">From: </span>
            {ride?.origin}
          </h3>
          <div className="h-[1.5px] bg-slate-200 w-full my-4" />
          <h3 className="text-xs">
            <span className="font-semibold text-sm">To: </span>
            {ride?.destination}
          </h3>
        </div>

        {/* OTP component */}
        <div>
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
            disabled={isButtonLoading}
            pattern={REGEXP_ONLY_DIGITS}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button onClick={onVerify} size="lg" disabled={isButtonLoading}>
          {isButtonLoading ? (
            <>
              <Loader2 className="animate-spin" />
              {STATUS_MESSAGES.VERIFYING_RIDE}
            </>
          ) : (
            STATUS_MESSAGES.VERIFY
          )}
        </Button>
        <CaptainCancelRideButton ride={ride} />
      </div>
    </div>
  );
};

export default CaptainRideAccepted;
