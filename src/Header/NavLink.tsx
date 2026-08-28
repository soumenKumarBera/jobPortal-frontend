import { Link, useLocation } from "react-router-dom";

const NavLinks = () => {
  const links = [
    { name: "Find Jobs", url: "/find-jobs" },
    { name: "Find Talent", url: "/find-talent" },
    { name: "post Job", url: "/post-job/0" },
    { name: "Posted job", url: "/posted-job/0" },
    { name: "Job History", url: "/job-history" },
    // { name: "SignUp", url: "/signup" }
  ];

  const location = useLocation();
  return (
    <div className=" lg-mx:hidden flex  gap-5 text-mine-shaft-300 h-full items-center ">
      {links.map((link, index) => (
        <div
          className={` ${location.pathname ==  link.url ? "border-mine-shaft-600 text-bright-sun-400" : "border-transparent"} border-[2px] p-2 h-full flex items-center`}
        >
          <Link key={index} to={link.url}>
            {link.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default NavLinks;
