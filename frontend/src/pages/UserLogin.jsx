import React, { useContext, useState } from "react";

import uberLogoBlack from "../assets/uberLogoDark.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../contexts/UserContext";
import { handleError } from "@/utils/errorHandler";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const UserLogin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const { user, setuser } = useContext(UserDataContext);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    const serverUrl = import.meta.env.VITE_SERVER_URL;

    try {
      setIsButtonLoading(true);
      const response = await axios.post(`${serverUrl}/users/login`, loginData);
      if (response.status === 200) {
        setuser(response.data.user);

        localStorage.setItem("token", response.data.token);

        navigate("/home");
      }
      setemail("");
      setpassword("");
    } catch (error) {
      handleError(error);
    } finally {
      setIsButtonLoading(false);
    }
  };

  return (
    <div className="p-8 h-screen w-screen flex flex-col">
      <div className="w-full">
        <img className="w-16" src={uberLogoBlack} />
      </div>
      <div className="flex flex-col pt-14 justify-between flex-grow ">
        <div>
          <form onSubmit={submitHandler}>
            <h3 className="text-lg font-semibold mb-2 ">What's Your Email</h3>
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
            <h3 className=" text-lg font-semibold mt-6 mb-2 ">
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
            <Button
              size="lg"
              disabled={isButtonLoading}
              className="my-4 w-full rounded"
            >
              {isButtonLoading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Verifying ...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
          <div className="mt-4">
            <p className="inline-block mr-2">New here ?</p>
            <Link to="/signup" className="underline">
              Create Your account
            </Link>
          </div>
        </div>
        <Link
          to="/captain-login"
          className="bg-black mt-6 rounded  mb-4 text-white flex justify-center items-center p-4 font-semibold"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
