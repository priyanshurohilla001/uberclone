import axios from "axios";
import toast from "react-hot-toast";

const STATUS_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  SERVER_ERROR: "Server error. Please try again later.",
  BAD_REQUEST: "Bad request. Please check your input.",
  UNAUTHORIZED: "Unauthorized. Please log in.",
  FORBIDDEN: "Forbidden. You do not have permission.",
  NOT_FOUND: "Resource not found.",
  UNKNOWN_ERROR: "An unknown error occurred. Please try again.",
};

const getErrorMessage = (status, backendMessage, customMessage) => {
  const defaultMessage = STATUS_MESSAGES[status] || STATUS_MESSAGES.UNKNOWN_ERROR;
  return customMessage || backendMessage || defaultMessage;
};

export const handleError = (error, customMessage) => {
  let errorMessage = STATUS_MESSAGES.UNKNOWN_ERROR;

  if (axios.isAxiosError(error)) {
    if (!error.response) {
      errorMessage = STATUS_MESSAGES.NETWORK_ERROR;
    } else {
      const backendMessage = error.response.data?.msg || error.response.data?.message;
      errorMessage = getErrorMessage(error.response.status, backendMessage, customMessage);
    }
  } else {
    errorMessage = customMessage || STATUS_MESSAGES.UNKNOWN_ERROR;
  }

  toast.error(errorMessage);
  console.error("Error:", error);
};
