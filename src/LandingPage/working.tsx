import { work } from "../Data/Data";
import { Avatar } from "@mantine/core";

const Working = () => {
  return (
    <div className="mt-20 pb-10">
      <div className="text-center text-4xl bs-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl font-semibold text-mine-shaft-100 pb-3 mt-6">
        How it <span className="text-bright-sun-400">Works</span>
      </div>
      <div className=" text-lg md-mx:text-base sm-mx:text-sm sm-mx:w-11/12 mb-10 mx-auto text-mine-shaft-300 text-center">
        Effortlessly navigate through the process and land your dream job.
      </div>

      <div className="flex items-center bs-mx:px-10 md-mx:px-5 md-mx:flex-col gap-2  justify-between  px-16 ">
        <div className=" relative">
          <img className="w-[30rem]" src="/Working/girl.png" alt="girl" />
          <div className="w-36 xs-mx:w-28 flex flex-col items-center gap-1 border border-bright-sun-400 p-3 rounded-xl backdrop-blur-md absolute top-[15%] right-0">
            <Avatar className="!h-16 !w-16 xs-mx:!size-12" src="avatar1.png" alt="it's me" />
            <div className="text-sm font-semibold text-mine-shaft-200 sm-mx:text-xs text-center">Complete your profile</div>
            <div className="text-xs text-mine-shaft-300 sm-mx:text-xs">70% completed</div>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          {work.map((item, index) => (
            <div className="flex items-center gap-4 ">
              <div className="p-3 bg-bright-sun-300 rounded-full">
                <img
                  className="size-12 md-mx:size-9 sm-mx:size-7"
                  src={`/Working/${item.name}.png`}
                  alt={item.name}
                />
              </div>
              <div>
                <div className="text-mine-shaft-200 text-xl md-mx:text-lg sm-mx:text-base font-semibold">
                  {item.name}
                </div>
                <div className="text-mine-shaft-300 md-mx:text-sm sm-mx:text-xs">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Working;
