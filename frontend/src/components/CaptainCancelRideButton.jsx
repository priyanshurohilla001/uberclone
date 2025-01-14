import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import axios from "axios";
import toast from "react-hot-toast";

const CaptainCancelRideButton = ({ ride }) => {
  const onCancel = async () => {
    console.log("cancelled");
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const rideId = ride._id;
    const token = localStorage.getItem("captainToken");

    try {
      const res = await axios.post(
        `${serverUrl}/rides/changestatusTo?status=cancelled&rideId=${rideId}`,
        {},
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );

      if (res.status == 200) {
        toast.success("Ride Cancelled");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }

      console.log(res);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          toast.error(error.response.data.msg);
        } else {
          toast.error("An error occurred while cancelling ride");
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="link">Cancel this ride</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently cacnel this
              ride
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <div className="flex w-full items-center justify-center">
              <AlertDialogCancel className="mt-0 border-none">
                Continue
              </AlertDialogCancel>
              <AlertDialogAction className="bg-red-600 text-white" onClick={onCancel}>
                Yes Cancel the ride
              </AlertDialogAction>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CaptainCancelRideButton;
