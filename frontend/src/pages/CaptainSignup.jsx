import React, { useState } from "react";

import uberDriverDark from "../assets/uberDriverDark.png";
import { Link } from "react-router-dom";

const CaptainSignup = () => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [captainData, setcaptainData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setcaptainData({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
    });
    console.log(captainData);
    setfirstname("");
    setlastname("");
    setemail("");
    setpassword("");
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
            <button className="bg-black mt-5 rounded text-white w-full p-4 font-semibold">
              Login
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
