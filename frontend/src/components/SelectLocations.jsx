import React, { useRef } from "react";
import { useState } from "react";
import LocationSuggestion from "./LocationSuggestion";
import axios from "axios";

const SelectLocations = ({ setno , setridedata }) => {
  const [isfull, setisfull] = useState(false);
  const [origin, setorigin] = useState("");
  const [destination, setdestination] = useState("");

  const submitHandler = async(e) => {
    e.preventDefault();

    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const res = await axios.get(`${serverUrl}/rides/fare?origin=${origin}&destination=${destination}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if(res.status == 200){
      setridedata((prev) => (
        {
          ...prev,
          origin : origin,
          destination : destination,
          fare : res.data,
        }
      ));
      setno(2);
    }
    
  };

  const originRef = useRef();
  const destinationRef = useRef();

  return (
    <div
      className={`${isfull ? "h-[90vh]" : "h-60"} transition-all duration-500`}
      onClick={() => setisfull(true)}
    >
      <div>
        <h2 className="text-2xl font-semibold">Find a ride</h2>
        <form onSubmit={submitHandler} className="relative pt-4">
          <input
            className="bg-gray-200 w-full p-3 rounded mb-4"
            type="text"
            placeholder="Where are you?"
            value={origin}
            onChange={(e) => {
              setorigin(e.target.value);
            }}
            required
            ref={originRef}
          />
          <input
            className="bg-gray-200 w-full p-3 rounded"
            type="text"
            placeholder="Where to?"
            value={destination}
            onChange={(e) => {
              setdestination(e.target.value);
            }}
            required
            ref={destinationRef}
          />
          <button className="bg-black mt-6 rounded text-white w-full p-4 font-semibold">
            confirm
          </button>
          <div className="absolute top-8 right-4 rounded h-20 w-2 bg-black"></div>
        </form>
      </div>
      {isfull && (
        <LocationSuggestion
          origin={origin}
          setorigin={setorigin}
          destination={destination}
          setdestination={setdestination}
          originRef={originRef}
          destinationRef={destinationRef}
        />
      )}
    </div>
  );
};

export default SelectLocations;
