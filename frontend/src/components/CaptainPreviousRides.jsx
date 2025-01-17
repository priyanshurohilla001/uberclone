import { handleError } from "@/utils/errorHandler";
import axios from "axios";
import { useEffect, useState } from "react";

import { Card, CardContent } from "../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";

const CaptainPreviousRides = () => {
  const [prevRides, setPrevRides] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/captains/allrides`,
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem("captainToken")}`,
            },
          }
        );
        console.log(res.data);
        setPrevRides(res.data);
      } catch (error) {
        handleError(error);
      }
    })();
  }, []);

  if (!prevRides) return null;

  return (
    <div className=" absolute bottom-5 ">
      <Carousel
        opts={{
          align: "start",
        }}
        orientation="vertical"
        className="w-full"
      >
        <CarouselContent className="-mt-1 h-[200px]">
          {prevRides.map((ride, index) => (
            <CarouselItem key={index} className="pt-1 md:basis-1/2">
              <div className="p-2">
                <Card className="z-10 shadow-2xl">
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <div className="flex justify-between items-center w-full mb-2">
                      <h3 className="text-xs text-gray-500">{ride?._id?.slice(0,7)}</h3>
                      <h3 className=" text-xs font-semibold capitalize">{ride?.status}</h3>
                    </div>
                    <div className="flex flex-col w-full items-start justify-start ">
                      <h3 className="text-xs">
                        <span className="font-semibold text-sm truncate">
                          From:{" "}
                        </span>
                        {ride?.origin.length > 80
                          ? `${ride.origin.slice(0, 80)}...`
                          : ride.origin}
                      </h3>
                      <div className="h-[1.5px] bg-slate-200 w-full my-1.5" />
                      <h3 className="text-xs">
                        <span className="font-semibold text-sm">To: </span>
                        {ride?.destination.length > 80
                          ? `${ride.destination.slice(0, 80)}...`
                          : ride.destination}
                      </h3>
                      <div className="flex justify-end w-full">
                        <Button size="sm">₹ {ride?.fare}</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CaptainPreviousRides;
