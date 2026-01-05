import EmailPasswordLogin from "../emailPasswordLogin";

const Login = () => {
  return (
    <div className=" bg-[url('/login_bg.jpeg')] bg-no-repeat bg-cover flex items-center justify-center w-full h-screen  mx-auto">
      <EmailPasswordLogin />
    </div>
  );
};

export default Login;
