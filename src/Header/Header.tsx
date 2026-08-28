import { Burger, Button, Drawer, Indicator } from "@mantine/core";
import { IconSettings, IconBell, IconAnchor } from "@tabler/icons-react";
import NavLinks from "./NavLink";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "../Servicess/ProfileService";
import { profileAction } from "../Slices/ProfileSlice";
import NotiMenu from "./NotiMenu";
import { setupResponseInterceptor } from "../Intercepter/AxiosIntercepter";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../Slices/UserSlice";
import { useDisclosure } from "@mantine/hooks";
import { isTokenExpired } from "../Servicess/AuthService";

const links = [
  { name: "Find Jobs", url: "/find-jobs" },
  { name: "Find Talent", url: "/find-talent" },
  { name: "post Job", url: "/post-job/0" },
  { name: "Posted job", url: "/posted-job/0" },
  { name: "Job History", url: "/job-history" },
  // { name: "SignUp", url: "/signup" }
];

const Header = () => {
  // ata dia cuurent hook bujte parbo

  const user = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.jwt);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [opened, { open, close }] = useDisclosure(false);

  // useEffect(()=>{
  //   setupResponseInterceptor(navigate);

  // },[navigate]);

  useEffect(() => {
    setupResponseInterceptor(navigate);
  }, [navigate]);

  useEffect(() => {
  
    if (token) {
      const decode = jwtDecode(localStorage.getItem("token") || "");
      dispatch(setUser({ ...decode, email: decode.sub }));
    }

 
    if(token && !isTokenExpired(token)){
    getProfile(user?.profileId)
      .then((res: any) => {
        dispatch(profileAction.setProfile(res));
      })
      .catch((err: any) => {
        console.log(err);
      });
    }
  }, [token, navigate]);

  return location.pathname != "/signup" && location.pathname != "/login" ? (
    <div className="w-full bg-mine-shaft-950 text-white h-20 flex justify-between p-6 items-center">
      <div className="flex gap-1.5 items-center text-bright-sun-500">
        <IconAnchor className="size-10" stroke={2.5} />
        <div className=" xs-mx:hidden text-3xl font-semibold">JobHook </div>
      </div>

      <NavLinks />

      <div className="flex items-center gap-3">
        {user ? (
          <ProfileMenu />
        ) : (
          <Link to="/login">
            <Button variant="subtle">Login</Button>{" "}
          </Link>
        )}
        {/* <div className="bg-mine-shaft-900 rounded-full p-2">
          <IconSettings stroke={2} />
        </div> */}

        {user ? (
          <div className="bg-mine-shaft-900 rounded-full p-2">
            <NotiMenu />
          </div>
        ) : (
          <></>
        )}

        <Burger className="lg:hidden" opened={opened} onClick={open} aria-label="Toggle navigation" />
        <Drawer
          position="right"
          overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
          opened={opened}
          onClose={close}
          size="xs"
        >
          {/* Drawer content */}
          <div className="flex flex-col gap-6 items-center">
            {links.map((link, index) => (
              <div
                key={index} className={" h-full flex items-center"}
              >
                <Link key={index} to={link.url} className="hover:text-bright-sun-400 text-xl">
                  {link.name}
                </Link>
              </div>
            ))}
          </div>
        </Drawer>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Header;
