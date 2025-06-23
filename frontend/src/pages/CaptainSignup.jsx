import React, { useState } from "react";
import axios from "axios";
import uberDriverDark from "../assets/uberDriverDark.png";
import { Link, useNavigate } from "react-router-dom";

const CaptainSignup = () => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    const newCaptain = {
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: parseInt(vehicleCapacity),
        vehicleType: vehicleType,
      },
    };

    const serverUrl = import.meta.env.VITE_SERVER_URL;

    try {
      const response = await axios.post(
        `${serverUrl}/captains/register`,
        newCaptain,
      );

      if (response.status === 201) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        if (error.response.data.errors) {
          setError(error.response.data.errors[0].msg);
        } else if (error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError("Registration failed. Please try again.");
        }
      } else {
        setError("Network error. Please try again.");
      }
    }

    setfirstname("");
    setlastname("");
    setemail("");
    setpassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  };

  return (
    <div className="p-8 h-screen w-screen flex flex-col">
      <div className="w-full">
        <img className="w-16" src={uberDriverDark} />
      </div>
      <div className="flex flex-col pt-8 justify-between flex-grow ">
        <div>
          <form onSubmit={submitHandler}>
            <h3 className="text-lg font-semibold mb-2 ">What's Your Name</h3>
            <div className="flex gap-4">
              <input
                className="bg-gray-200 w-1/2 p-3 rounded"
                type="text"
                placeholder="firstname"
                value={firstname}
                onChange={(e) => {
                  setfirstname(e.target.value);
                }}
                required
              />
              <input
                className="bg-gray-200 w-1/2 p-3 rounded"
                type="text"
                placeholder="lastname"
                value={lastname}
                onChange={(e) => {
                  setlastname(e.target.value);
                }}
                required
              />
            </div>

            <h3 className="text-lg font-semibold mt-5 mb-2 ">
              What's Your Email
            </h3>
            <input
              className="bg-gray-200 w-full p-3 rounded"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              required
            />
            <h3 className=" text-lg font-semibold mt-5 mb-2 ">
              Enter Password
            </h3>
            <input
              className="bg-gray-200 w-full p-3 rounded"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              required
            />

            <h3 className="text-lg font-semibold mt-5 mb-2">
              Vehicle Information
            </h3>
            <div className="flex gap-4 mb-3">
              <input
                className="bg-gray-200 w-1/2 p-3 rounded"
                type="text"
                placeholder="Vehicle Color"
                value={vehicleColor}
                onChange={(e) => {
                  setVehicleColor(e.target.value);
                }}
                required
              />
              <input
                className="bg-gray-200 w-1/2 p-3 rounded"
                type="text"
                placeholder="License Plate"
                value={vehiclePlate}
                onChange={(e) => {
                  setVehiclePlate(e.target.value);
                }}
                required
              />
            </div>

            <div className="flex gap-4">
              <select
                className="bg-gray-200 w-1/2 p-3 rounded"
                value={vehicleType}
                onChange={(e) => {
                  setVehicleType(e.target.value);
                }}
                required
              >
                <option value="">Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="auto">Auto</option>
              </select>
              <select
                className="bg-gray-200 w-1/2 p-3 rounded"
                value={vehicleCapacity}
                onChange={(e) => {
                  setVehicleCapacity(e.target.value);
                }}
                required
              >
                <option value="">Passenger Capacity</option>
                <option value="1">1 Passenger</option>
                <option value="2">2 Passengers</option>
                <option value="3">3 Passengers</option>
                <option value="4">4 Passengers</option>
                <option value="6">6 Passengers</option>
              </select>
            </div>

            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <button className="bg-black mt-5 rounded text-white w-full p-4 font-semibold">
              Create Your account
            </button>
          </form>
          <div className="mt-4">
            <p className="inline-block mr-2">Already got a account ?</p>
            <Link to="/login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
      <div>
        <p className="text-xs">
          By proceeding, you consent to get calls, WhatsApp or SMS messages,
          including by automated means, from Uber and its affiliates to the
          number provided.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
