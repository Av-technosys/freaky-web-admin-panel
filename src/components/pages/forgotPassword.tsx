import { useState } from "react";

// import mainImage from "@/./assets/signInImage.png";
import ForgetPasswordUsingEmail from "../forgotPasswordUsingEmail";
import ForgetPasswordUsingOTP from "../forgotPasswordUsingOTP";

const ForgetPassword = () => {
  const [otpPopup, setOtpPopup] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  return (
    <div className="w-full h-screen mx-auto bg-[url('/login_bg.jpeg')] bg-no-repeat bg-cover flex items-center justify-center ">
      {otpPopup == false ? (
        <ForgetPasswordUsingEmail
          otpPopup={otpPopup}
          setOtpPopup={setOtpPopup}
          setUserEmail={setUserEmail}
        />
      ) : (
        <ForgetPasswordUsingOTP userEmail={userEmail} />
      )}
    </div>
  );
};

export default ForgetPassword;
