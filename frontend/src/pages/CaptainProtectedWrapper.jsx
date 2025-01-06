import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CaptainProtectedWrapper = ({ children }) => {

  const navigate = useNavigate();

  useEffect(()=>{
    const captainToken = localStorage.getItem("captainToken");
    if (!captainToken) {
      navigate("/captain-login");
    }
  },[navigate])

  return <>{children}</>;
};

export default CaptainProtectedWrapper;
