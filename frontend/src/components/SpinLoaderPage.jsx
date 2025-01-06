import React from "react";

const SpinLoaderPage = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
    </div>
  );
};

export default SpinLoaderPage;
