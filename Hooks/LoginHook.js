import { showAxiosError } from "../core/toast";
import { API } from "../core/url";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "../Redux/Slices/ProfileSlice";
export const useLoginHook = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (data) => {
    try {
      const resp = await API.post("/auth/login", data);
      localStorage.setItem("token", resp.data.token);

      dispatch(fetchUserProfile());
      if (resp.approved) {
        navigate("/");
      } else {
        navigate("/under-verification");
      }
    } catch (error) {
      showAxiosError(error);
    }
  };

  return { handleSubmit };
};
