import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import LocationIcon from "../icons/LocationIcon";

const LocationSuggestion = ({
  origin,
  setorigin,
  destination,
  setdestination,
  originRef,
  destinationRef,
}) => {
  const [suggestions, setsuggestions] = useState({ type: "", data: [] });

  async function fetchSuggestions(type, input) {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const res = await axios.get(
      `${serverUrl}/maps/get-suggestions?input=${input}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = res.data;

    const suggestions = data.map((x) => x.description);
    setsuggestions((x) => ({
      type,
      data: suggestions,
    }));

  }

  const debounceTimeout = useRef(null);

  function debounce(type, value) {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => fetchSuggestions(type, value), 700);
  }

  useEffect(() => {
    if (origin.length > 3) {
      debounce("origin", origin);
    }
  }, [origin]);

  useEffect(() => {
    if (destination.length > 3) {
      debounce("destination", destination);
    }
  }, [destination]);

  return (
    <div className="mt-10">
      {suggestions.data.map((suggestion, index) => (
        <div
          key={index}
          className="py-3 flex items-center justify-start active:bg-gray-100"
          onClick={() => {
            if (suggestions.type === "origin") {
              setorigin(suggestion);
              destinationRef.current.focus();
            } else {
              setdestination(suggestion);
              originRef.current.focus();
            }
          }}
        >
          <div className="size-9 flex items-center justify-center bg-gray-100 rounded-full flex-shrink-0 mr-4">
            <LocationIcon />
          </div>
          <h3 className="text-xs font-light text-gray-800">{suggestion}</h3>
        </div>
      ))}
    </div>
  );
};

export default LocationSuggestion;
