import { ChevronDown, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import PropTypes from "prop-types";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import formatTimeAgo from "@/utils/formatTimeAgo";

const NewRideContainer = ({ rides, setRides, setRide }) => {
  const { user, origin, destination, fare, createdAt } = rides[0];
  const { firstname, lastname } = user.fullname;
  const {email} = user

  const [isButtonLoading, setIsButtonLoading] = useState(false);

  async function onAccept() {
    setIsButtonLoading(true);
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const rideId = rides[0]._id;
    const token = localStorage.getItem("captainToken");

    try {
      const res = await axios.post(
        `${serverUrl}/rides/changestatusTo?status=accepted&rideId=${rideId}`,
        {},
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      if (res.status == 200) {
        setRide(res.data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      } else {
        console.log(error);
      }
    } finally {
      setIsButtonLoading(false);
    }
  }

  function onReject() {
    setRides((prev) => prev.slice(1));
  }

  return (
    <div className="bottom-0 bg-white  rounded-t-2xl  absolute w-full  min-h-48 shadow-2xl ">
      {/* Header */}
      <div className="w-full bg-black text-white rounded-t-2xl p-4 flex justify-between items-center">
        <div className="flex justify-between gap-3">
          <div className="bg-slate-700 size-8 rounded-full flex items-center justify-center">
            <h3 className="capitalize text-lg ">
              {firstname[0]}
            </h3>
          </div>
          <div className="flex flex-col">
            <h5>
              {firstname} {lastname}
            </h5>
            <h6 className="text-xs font-light text-slate-100">
              {email}
            </h6>
          </div>
        </div>
        <h3 className="text-2xl font-semibold">₹ {fare}</h3>
      </div>
      <h3 className="w-full text-right text-sm mt-1 text-slate-600 font-light px-2">
        Created {formatTimeAgo(createdAt)}
      </h3>
      {/* Content */}
      <div className="p-4 flex flex-col items-center gap-4 justify-center w-full ">
        <div className="relative flex flex-col gap-3 pl-6 items-start justify-center">
          <h3 className="text-xs">{origin}</h3>
          <h3 className="text-xs">{destination}</h3>
          <div className="w-0.5 h-[90%] border-r-2 border-dotted border-slate-700 absolute left-2 flex items-center justify-center">
            <h5>
              <ChevronDown />
            </h5>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 mt-2">
          <Button size="lg" onClick={onAccept}>
            {isButtonLoading ? (
              <>
                <Loader2 className="animate-spin" />
                Please wait
              </>
            ) : (
              "Accept"
            )}
          </Button>
          <Button size="lg" onClick={onReject} variant="destructive">
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
};

NewRideContainer.propTypes = {
  rides: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        fullname: PropTypes.shape({
          firstname: PropTypes.string.isRequired,
          lastname: PropTypes.string.isRequired,
        }).isRequired,
        _id: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      }).isRequired,
      origin: PropTypes.string.isRequired,
      destination: PropTypes.string.isRequired,
      fare: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    })
  ).isRequired,
  setRides: PropTypes.func.isRequired,
};

export default NewRideContainer;
