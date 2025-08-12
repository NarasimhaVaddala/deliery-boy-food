import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export const showErrorMessage = (message) => {
  toast.error(message, {
    position: "bottom-right",
    autoClose: 1000,
    theme: "colored",
  });
};
export const showSuccessMessage = (message) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 1000,
    theme: "colored",
  });
};
export const showInfoMessage = (message) => {
  toast.info(message, {
    position: "bottom-right",
    autoClose: 1000,
    theme: "colored",
  });
};

export const showAxiosError = (error) => {
  if (isAxiosError(error)) {
    showErrorMessage(error?.response?.data?.message);
  } else {
    showErrorMessage(error?.message || "Something Went Wrong");
  }
};
