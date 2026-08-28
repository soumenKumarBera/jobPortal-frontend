import { TextInput, Avatar } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
const DreamJob = () => {
  return (
    <div className="flex sm-mx:flex-col-reverse items-center px-20 bs-mx:px-10 md-mx:px-5 ">
      <div className="flex flex-col w-[45%] sm-mx:w-full gap-3">
        <div className="text-6xl bs-mx:text-5xl  md-mx:text-4xl sm-mx:text-3xl font-bold text-mine-shaft-100 [&_span]:text-bright-sun-400 leading-tight">
          Find your <span>dream</span> <span>job</span> with us
        </div>

        <div className="text-lg md-mx:text-base sm-mx:text-sm text-mine-shaft-200">
          Good life begins with a good company. Start explore thousands of jobs
          in one place.
        </div>

        <div className="flex items-center gap-3 mt-5">
          <TextInput
            className="bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:!text-mine-shaft-100"
            variant="unstyled"
            label="Job Tittle"
            placeholder="Software Engineer"
          />
          <TextInput
            className="bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:!text-mine-shaft-100"
            variant="unstyled"
            label="Job Type"
            placeholder="Full-time"
          />
          <div className="flex items-center justify-center h-full w-20 bg-bright-sun-400 rounded-lg cursor-pointer text-mine-shaft-100 p-2 hover:bg-bright-sun-500 transition-duration-500">
            <IconSearch stroke={2} className="h-[85%] w-[85%]" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-[55%] sm-mx:w-full">
        <div className="w-[30rem] relative">
          <img src="/Boy.png" alt="dream job" />
          <div className = "absolute -right-10 bs-mx:right-0 top-[50%] xs-mx:-left-0  xs-mx:top-[10%]  w-fit  border border-bright-sun-400 rounded-lg p-2 backdrop-blur-md ">
            <div className = "text-center mb-1 text-sm text-mine-shaft-100"> 10K+ got job</div>
            <Avatar.Group>
              <Avatar src="/avatar.png" />
              <Avatar src="/avatar1.png" />
              <Avatar src="/avatar2.png" />
              <Avatar>+5</Avatar>
            </Avatar.Group>
          </div>

          <div className = "absolute bs-mx:gap-1 xs-left-5 top-[28%] bs-mx:top-[35%] xs-mx:top-[50%] xs-mx:!right-0 w-fit  border border-bright-sun-400 rounded-lg p-2 backdrop-blur-md gap-2 flex flex-col">
            <div className="flex items-center gap-2 ">
              <div className = "size-10 bs-mx:size-8 p-0.5 bg-mine-shaft-900 rounded-lg"> 
                <img src="/Icons/Google.png" alt="Google" />
              </div>
              <div className = "text-sm bs-mx:text-[11px] text-mine-shaft-100">
                <div>Software Engineer</div>
                <div className="text-xs bs-mx:text-[9px] text-mine-shaft-200">New York</div>
              </div>

            </div>
            <div className="flex  bs-mx:text-sm justify-around items-center gap-2 mt-2 text-mine-shaft-200 ">
              <span>1 day ago</span>
              <span>120 Applicants</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DreamJob;
