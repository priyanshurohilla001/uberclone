import axios from "axios";
import React, { useEffect } from "react";

const UserLogout = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    const serverUrl = import.meta.env.VITE_SERVER_URL;

    const logout = async () => {
      await axios.post(`${serverUrl}/users/logout`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    logout();
    
    localStorage.removeItem("token");
  }, []);
  return <div>User Logged Out</div>;
};

export default UserLogout;
