import { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";
import searchAnimation from "../assets/searchAnimation.json"; // Import the JSON file directly

export default function LookingForCaptainLottie({ radMul }) {
  const boxRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    animationRef.current = lottie.loadAnimation({
      container: boxRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: searchAnimation, // Use the imported JSON data
    });

    animationRef.current.play();

    return () => {
      animationRef.current.destroy();
    };
  }, []);

  const width = 100 * (radMul/3);

  return (
    <div className="size-42 flex justify-center items-center p-4 transition-all ease-in-out delay-200">
      <div
        ref={boxRef}
        style={{
          background: "white",
          width:  `${width}%`,
        }}
      ></div>
    </div>
  );
}
