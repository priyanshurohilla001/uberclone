import { useState } from "react";
import SelectLocations from "../components/SelectLocations";
import SelectFare from "../components/SelectFare";
import ConfirmRide from "../components/ConfirmRide";
import LookingDriver from "../components/LookingDriver";
import { socket } from "../socket";

const components = {
  1: SelectLocations,
  2: SelectFare,
  3: ConfirmRide,
  4: LookingDriver,
};

const Home = () => {
  const [no, setno] = useState(1);
  const CurrentComponent = components[no];

  socket.on("test", (test) => {
    console.log("test done success ",test);
  });

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
    <div className=" bg-cover h-screen w-screen relative object-cover bg-[url('https://miro.medium.com/v2/resize:fit:1400/format:webp/0*gwMx05pqII5hbfmX.gif')]">
      <div className="absolute bottom-0 p-4 bg-white rounded-t-2xl w-full shadow-xl z-40">
        {CurrentComponent ? (
          <CurrentComponent
            setno={setno}
            ridedata={ridedata}
            setridedata={setridedata}
          />
        ) : null}
      </div>
      <img
        src="./src/assets/uberLogoDark.png"
        className="absolute top-5 left-5 h-6 "
      />
    </div>
  );
};

export default Home;
