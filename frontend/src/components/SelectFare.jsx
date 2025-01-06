import React, { useEffect } from "react";
import PropTypes from "prop-types";
import UserIcon from "../icons/UserIcon";


const vehicleData = (ridedata) => [
  {
    name: "auto",
    time: "5 mins",
    capacity: 3,
    fare: ridedata.fare.auto || 0,
    img: "./src/assets/auto.jpg",
  },
  {
    name: "motorcycle",
    time: "4 mins",
    capacity: 1,
    fare: ridedata.fare.motorcycle || 0,
    img: "./src/assets/moto.jpg",
  },
  {
    name: "car",
    time: "2 mins",
    capacity: 4,
    fare: ridedata.fare.car || 0,
    img: "./src/assets/car.jpg",
  },
];

const SelectFare = ({ setno, ridedata , setridedata }) => {
  console.log(ridedata)
  console.log(vehicleData)
  return (
    <div className="flex flex-col gap-4 items-start justify-center ">
      <h1 className="text-2xl font-semibold">Select vehicle</h1>
      {vehicleData(ridedata) &&
        vehicleData(ridedata).map((item, index) => (
          <div
            className="flex items-center justify-between w-full p-4 border-2 border-gray-100 rounded-md hover:bg-gray-100"
            key={index}
            onClick={() => {
              setridedata({ ...ridedata, vehicleType: item.name });
              setno(3);
            }}
          >
            <img src={item.img} className="w-16" />
            <div className="flex flex-col">
              <div className="flex items-center">
                <p className="text mr-2">{item.name}</p>
                <UserIcon />
                <p className=" text">{item.capacity}</p>
              </div>
              <h5 className="text-xs">{item.time}</h5>
              <h5 className="text-[12px] text-gray-500">
                Affordable Compact Rides
              </h5>
            </div>
            <h3 className="text-xl font-medium">₹{item.fare}</h3>
          </div>
        ))}
    </div>
  );
};

export default SelectFare;
