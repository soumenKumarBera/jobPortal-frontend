import { IconAnchor, IconArrowLeft } from "@tabler/icons-react";
import SignUp from "../SignUpLogin/SignUp";
import Login from "../SignUpLogin/Login";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";

const SignUpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="h-[100vh]  bg-mine-shaft-800 font-['Poppins'] overflow-hidden sm-mx:overflow-auto relative ">
      <div
        className="my-4 inline-block !absolute left-5 z-10"
        onClick={() => navigate("/home")}
      >
        <Button
          variant="light"
          leftSection={<IconArrowLeft />}
          className="!text-bright-sun-300"
          color="orange"
        >
          Home
        </Button>
      </div>

      <div
        className={`  flex [&>*]:flex-shrink-0 transition-all  ease-in-out duration-1000 ${location.pathname == "/signup" ? "-translate-x-1/2 sm-mx:-translate-x-full" : "translate-x-0"} `}
      >
        <Login />
        <div
          className={`w-1/2 h-[100vh]  sm-mx:hidden  sm-mx:min-h-full   bg-mine-shaft-700 flex items-center justify-center flex-col gap-2 transition-all  ease-in-out duration-1000 ${location.pathname == "/login" ? "rounded-l-[225px]" : "rounded-r-[225px]"}`}
        >
          <div className="flex gap-1.5 items-center text-bright-sun-500">
            <IconAnchor className="size-10" stroke={2.5} />
            <div className="text-6xl bs-mx:text-5xl md-mx:text-4xl sm-mx:text-3xl   font-semibold">JobHook </div>
          </div>

          <div className="text-2xl bs-mx:text-xl md-mx:text-lg  text-mine-shaft-200 font-semibold">
            Find the made for you
          </div>
        </div>

        <SignUp />
      </div>
    </div>
  );
};

export default SignUpPage;
