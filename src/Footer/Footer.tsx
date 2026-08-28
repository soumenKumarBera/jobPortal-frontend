import {
  IconSettings,
  IconBell,
  IconAnchor,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
} from "@tabler/icons-react";

import { footerLinks } from "../Data/Data";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  return location.pathname != "/signup" && location.pathname != "/login" ? (
    <div className=" pt-20 pb-5 flex gap-5 p-4 justify-around flex-wrap  font-['Poppins']">
      <div className="w-1/4 flex flex-col gap-4 xs-mx:w-1/2 xsm-mx:w-full  ">
        <div className="flex gap-1.5 items-center text-bright-sun-500">
          <IconAnchor className="size-10" stroke={2.5} />
          <div className="text-3xl font-semibold">JobHook </div>
        </div>
        <div className="text-sm text-gray-300">
          Job portal with user profiles, skill updates, certifications, work
          experience and admin job postings{" "}
        </div>
        <div className="flex gap-3 text-bright-sun-400 [&>div]:bg-mine-shaft-900 [&>div]:p-3 [&>div]:rounded-full [&>div]:cursor-pointer hover:[&>div]:bg-mine-shaft-700">
          <div>
            <IconBrandFacebook stroke={2} />
          </div>
          <div>
            <IconBrandInstagram stroke={2} />
          </div>
          <div>
            <IconBrandX stroke={2} />
          </div>
        </div>
      </div>

      {footerLinks.map((item, index) => (
        <div key={index}>
          <div className="text-lg font-semibold mb-4 text-bright-sun-400">
            {item.title}
          </div>
          {item.links.map((link, index) => (
            <div
              key={index}
              className="text-sm text-mine-shaft-300 cursor-pointer hover:text-bright-sun-400 mb-1 hover:translate-x-2 transition duration-500  "
            >
              {link}
            </div>
          ))}
        </div>
      ))}
    </div>
  ) : (
    <></>
  );
};
export default Footer;
