// import motion from "framer-motion";
import Marquee from "react-fast-marquee";
import { companies } from "../Data/Data";

const Companies = () => {
  return (
    <div className="mt-20 pb-5 ">
      <div className="text-4xl bs-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl mb-10 text-center font-semibold text-mine-shaft-100">
        Trusted By <span className="text-bright-sun-400">1000+</span> Companies
      </div>
      <Marquee pauseOnHover={true}>
        {companies.map((company, index) => (
          <div
            key={index}
            className="mx-10 hover:bg-mine-shaft-900 rounded-lg p-2 transition duration-300 ease-in-out sm-mx:mx-6 xs-mx:mx-4 xsm-mx:mx-2"
          >
            <img
              src={`/Companies/${company}.png`}
              alt={company}
              className="h-12"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Companies;
