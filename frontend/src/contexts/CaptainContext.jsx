import React, { useState } from "react";
import { createContext } from "react";

export const CaptainContextData = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setcaptain] = useState(null);

  return (
    <CaptainContextData.Provider value={{ captain, setcaptain }}>
      {children}
    </CaptainContextData.Provider>
  );
};

export default CaptainContext;
