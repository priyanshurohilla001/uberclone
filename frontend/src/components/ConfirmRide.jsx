import React from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ConfirmRide = ({ ridedata, setridedata }) => {
  const onConfirmRide = async () => {
    const { origin, destination, vehicleType } = ridedata;
    try {
      const serverUrl = import.meta.env.VITE_SERVER_URL;
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${serverUrl}/rides/search`,
        {
          origin,
          destination,
          vehicleType,
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      if (res.status != 201) {
        return toast.error("Ride creation failed");
      }

      toast.success("Ride created");
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-start gap-4 py-4">
      <h1 className="text-2xl font-semibold mb-2">Confirm Your Ride</h1>
      <div className="grid grid-cols-6 w-full">
        <div className="col-span-1 flex items-center justify-center">
          <LocationIcon />
        </div>
        <div className="col-span-5">
          {ridedata.origin ? ridedata.origin : "Origin"}
          <div className="w-full h-0.5 mt-3 bg-gray-100" />
        </div>
      </div>
      <div className="grid grid-cols-6 w-full">
        <div className="col-span-1 flex items-center justify-center">
          <LocationIcon />
        </div>
        <div className="col-span-5">
          {ridedata.destination ? ridedata.destination : "Destination"}
          <div className="w-full h-0.5 mt-3 bg-gray-100" />
        </div>
      </div>
      <div className="grid grid-cols-6 w-full">
        <div className="col-span-1 flex items-center justify-center">
          <GearIcon />
        </div>
        <div className="col-span-5">
          <h3 className="font-semibold">
            {ridedata.vehicleType ? ridedata.vehicleType : "Default Vehicle"}
          </h3>
          <div className="w-full h-0.5 mt-3 bg-gray-100" />
        </div>
      </div>
      <div className="grid grid-cols-6 w-full">
        <div className="col-span-1 flex items-center justify-center">
          <RuppeIcon />
        </div>
        <div className="col-span-5">
          <h3 className="font-semibold">
            ₹
            {ridedata.fare && ridedata.vehicleType
              ? ridedata.fare[ridedata.vehicleType]
              : 0}{" "}
          </h3>
        </div>
      </div>
      <button
        className="bg-black mt-6 rounded text-white w-full p-4 font-semibold"
        onClick={onConfirmRide}
      >
        Confirm Ride
      </button>
    </div>
  );
};

const GearIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-6"
  >
    <path
      fillRule="evenodd"
      d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z"
      clipRule="evenodd"
    />
  </svg>
);

const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-6"
  >
    <path
      fillRule="evenodd"
      d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
      clipRule="evenodd"
    />
  </svg>
);

const RuppeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-6 flex-shrink-0"
  >
    <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
    <path
      fillRule="evenodd"
      d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z"
      clipRule="evenodd"
    />
    <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
  </svg>
);

export default ConfirmRide;
