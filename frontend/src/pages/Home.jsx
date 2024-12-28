import React, { useContext } from "react";
import { UserDataContext } from "../contexts/UserContext";

const Home = () => {
  const { user } = useContext(UserDataContext);

  console.log("data in context is ", user);

  return <div>Home</div>;
};

export default Home;
