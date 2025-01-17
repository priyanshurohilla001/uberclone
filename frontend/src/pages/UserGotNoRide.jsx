import { useState } from "react";
import SelectLocations from "../components/SelectLocations";
import SelectFare from "../components/SelectFare";
import ConfirmRide from "../components/ConfirmRide";

const components = {
  1: SelectLocations,
  2: SelectFare,
  3: ConfirmRide,
};

const UserGotNoRide = ({setRide}) => {
  const [no, setno] = useState(1);
  const CurrentComponent = components[no];

  const [ridedata, setridedata] = useState({
    origin: "",
    destination: "",
    fare: {
      auto: 0,
      motorcycle: 0,
      car: 0,
    },
    vehicleType: "",
  });

  return (
    <div className="absolute bottom-0 p-4 bg-white rounded-t-2xl w-full shadow-xl z-40">
      {CurrentComponent ? (
        <CurrentComponent
          setno={setno}
          ridedata={ridedata}
          setridedata={setridedata}
          setRide={setRide}
        />
      ) : null}
    </div>
  );
};

export default UserGotNoRide;
