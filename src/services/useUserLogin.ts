import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { loginUser } from "../helper/loginUser";

export const useUserLoginMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success("Login successful");
      const Token = JSON.stringify(data.idToken);
      localStorage.setItem("access_token", Token);
      navigate("/");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
};
