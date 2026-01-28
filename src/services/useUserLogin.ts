import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { loginUser } from "../helper/loginUser";
import { jwtDecode } from "jwt-decode";

const decodeIdToken = (token: string): any => {
  const decoded = jwtDecode(token) as any;

  return {
    username: decoded["cognito:username"] ?? decoded.sub,
  };
};

export const useUserLoginMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success("Login successful");
      const Token = data.idToken;
      const refreshToken = data.refreshToken;

      const user = decodeIdToken(data.idToken);

      localStorage.setItem("id_token", Token);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("username", user.username);
      navigate("/");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
};
