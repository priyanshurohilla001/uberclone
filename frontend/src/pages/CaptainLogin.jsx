import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import uberDriverDark from "../assets/uberDriverDark.png";
import axios from "axios";
import { CaptainContextData } from "../contexts/CaptainContext";
import { handleError } from "@/utils/errorHandler";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const CaptainLogin = () => {
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const navigate = useNavigate();

  const { setcaptain } = useContext(CaptainContextData);

  const submitHandler = async (e) => {
    e.preventDefault();
    const serverUrl = import.meta.env.VITE_SERVER_URL;

    try {
      setIsButtonLoading(true);
      const res = await axios.post(`${serverUrl}/captains/login`, {
        email: email,
        password: pass,
      });
      if (res.status === 200) {
        const token = res.data.token;
        setcaptain(res.data.captain);
        localStorage.setItem("captainToken", token);
        navigate("/captain-home");
      }
      setemail("");
      setpass("");
    } catch (error) {
      handleError(error);
    } finally {
      setIsButtonLoading(false);
    }
  };

  return (
    <div className="p-8 h-screen w-screen flex flex-col">
      <div className="w-full">
        <img className="w-16" src={uberDriverDark} />
      </div>
      <div className="flex flex-col pt-14 justify-between flex-grow">
        <div>
          <form onSubmit={submitHandler}>
            <h3 className="text-lg font-semibold mb-2 ">What's Your Email</h3>
            <input
              className="bg-gray-200 w-full p-3 rounded"
              type="email"
              placeholder="email@example.com"
              value={email}
              required
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
              value={pass}
              onChange={(e) => {
                setpass(e.target.value);
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
            <p className="inline-block mr-2">Join a fleet ?</p>
            <Link to="/captain-signup" className="underline">
              Register as a Captain
            </Link>
          </div>
        </div>
        <Link
          to="/login"
          className="bg-black mt-6 rounded  mb-4 text-white flex justify-center items-center p-4 font-semibold"
        >
          Sign in as user
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
