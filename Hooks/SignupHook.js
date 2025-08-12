import { showAxiosError } from "../core/toast";
import { API } from "../core/url";

import { useNavigate } from "react-router-dom";

export const useSignUpHook = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      const formdata = new FormData();
      formdata.append("name", data.name);
      formdata.append("email", data.email);
      formdata.append("mobile", data.mobile);
      formdata.append("password", data.password);
      formdata.append("aadhar", data.aadhar?.[0]);
      formdata.append("license", data.license?.[0]);
      formdata.append("role", "delivery");
      const resp = await API.post("/auth/register-delivery", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      localStorage.setItem("token", resp.data.token);
      navigate("/under-verification");

      console.log(resp.data);
    } catch (error) {
      showAxiosError(error);
    }
  };

  return {
    handleSubmit,
  };
};
