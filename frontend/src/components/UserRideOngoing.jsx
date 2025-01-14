import { Users } from "lucide-react";
import UserCancelRideButton from "./UserCancelRideButton";
import RideCompleted from "./RideCompleted";

const UserRideOngoing = ({ ride }) => {
  //   const {origin , destination , }

  const { otp, fare, captain, destination } = ride;
  const { plate, color, capacity } = captain.vehicle;
  const { fullname, email } = captain;
  const { firstname, lastname } = fullname;

  console.log("user ride ongoing :", ride);


  return (
    <div className="bottom-0 bg-white rounded-t-2xl absolute w-full min-h-48 shadow-2xl">
      <div className="w-full bg-black text-white rounded-t-2xl p-4 flex justify-between items-center">
        <div className="flex justify-between items-center gap-3">
          <div className="bg-slate-700 size-8 rounded-full flex items-center justify-center">
            <h3 className="capitalize text-lg ">{firstname[0]}</h3>
          </div>
          <div className="flex flex-col">
            <h5>{firstname}</h5>
            <h6 className="text-xs font-light text-slate-100">{email}</h6>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <h3 className="text-2xl">{plate}</h3>
          <div className="flex items-center justify-end gap-4">
            <div className="flex gap-1 items-center">
              {capacity} <Users className="size-4" />
            </div>
            <h3 className="">{color}</h3>
          </div>
        </div>
      </div>
      <div className="p-6 flex flex-col items-center gap-3 justify-center w-full">
        <div className=" bg-gray-100 px-3 py-1 rounded-md font-semibold text-sm">
          ₹ {fare}
        </div>
        <h3 className="text-xl font-semibold">Ride in Progress</h3>
        <div className="relative gap-y-2">
          <h3 className="text-xs mb-5">
            <span className="font-semibold : text-sm">To : </span>
            {destination}
          </h3>
        </div>
        <UserCancelRideButton ride={ride} />
      </div>
    </div>
  );
};

export default UserRideOngoing;
