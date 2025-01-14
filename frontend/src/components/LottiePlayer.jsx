import { useEffect, useRef } from "react";
import lottie from "lottie-web";

export default function LottiePlayer({animation}) {
  const boxRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    animationRef.current = lottie.loadAnimation({
      container: boxRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animation, // Use the imported JSON data
    });

    animationRef.current.play();

    return () => {
      animationRef.current.destroy();
    };
  }, []);


  return (
    <div className="size-42 flex justify-center items-center p-4 transition-all ease-in-out delay-200">
      <div
        ref={boxRef}
        style={{
          background: "white",
          width: "100%",
          height : "100%"
        }}
      ></div>
    </div>
  );
}
