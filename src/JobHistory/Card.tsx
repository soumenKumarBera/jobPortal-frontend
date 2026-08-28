import {
  IconBookmarkFilled,
  IconBookmark,
  IconCalendar,
} from "@tabler/icons-react";
import { Text, Button } from "@mantine/core";
import { Divider } from "@mantine/core";
import { IconClockHour4 } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { timeAgo } from "../Servicess/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../Servicess/ProfileService";
import { profileAction } from "../Slices/ProfileSlice";

const Card = (jobDetails: any) => {
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();

  const handelSaveJob = () => {
    let savedJobs: any = [...profile.savedJobs];

    if (savedJobs.includes(jobDetails.id)) {
      savedJobs = savedJobs.filter((id: any) => id !== jobDetails.id);
    } else {
      savedJobs = [...savedJobs, jobDetails.id];
    }

    let update = { ...profile, savedJobs: savedJobs };

    updateProfile(update)
      .then((res) => {
        dispatch(profileAction.changeProfile(res));
      })
      .catch((error) => {
        console.log(error.response.data.errorMessage);
      });
  };

  return (
    <div className="bg-mine-shaft-700 p-4 w-72 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !bright-sun-400 cursor-pointer">
      <div className="flex justify-between ">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-600 rounded-md">
            <img
              className="h-7 "
              src={`/Icons/${jobDetails.company}.png`}
              alt={jobDetails.company}
            />
          </div>
          <div>
            <div className="font-semibold">{jobDetails.jobTitle}</div>
            <div className="text-xs text-mine-shaft-300">
              {jobDetails.company} &#x2022;{" "}
              {jobDetails.applicants ? jobDetails.applicants.length : 0}{" "}
              Applications
            </div>
          </div>
        </div>
        {jobDetails.saved ? (
          <IconBookmarkFilled
            stroke={2}
            className="text-bright-sun-400 cursor-pointer "
          />
        ) : profile.savedJobs?.includes(jobDetails.id) ? (
          <IconBookmarkFilled
            onClick={handelSaveJob}
            stroke={2}
            className=" cursor-pointer text-bright-sun-400 "
          />
        ) : (
          <IconBookmark
            onClick={handelSaveJob}
            stroke={2}
            className="text-mine-shaft-300 cursor-pointer hover:text-bright-sun-400 "
          />
        )}
      </div>
      <div className="flex gap-2 [&>div]:px-2 [&>div]:py-1 [&>div]:bg-mine-shaft-600 [&>div]:rounded-lg [&>div]:text-xs [&>div]:text-bright-sun-400 mt-4">
        <div>{jobDetails.experience}</div>
        <div>{jobDetails.jobType}</div>
        <div>{jobDetails.location}</div>
      </div>
      <Text lineClamp={3} className="text-xs text-justify text-mine-shaft-300 ">
        {jobDetails.about}
        {/* Text content */}
      </Text>
      <Divider size="xs" color="mine-shaft.7" />
      <div className="flex justify-between text-sm ">
        <div className="font-semibold">
          &#8377;{jobDetails.packageOffered} LPA{" "}
        </div>
        <div className="flex items-center gap-1 text-mine-shaft-300">
          <IconClockHour4 className="size-5" stroke={1.5} />
          {jobDetails.applied || jobDetails.interviewing
            ? "Applied"
            : jobDetails.offered
              ? "Interviewed"
              : "Posted"}{" "}
          {timeAgo(jobDetails.postTime)}
        </div>
      </div>
      {(jobDetails.interviewing || jobDetails.offered) && (
        <Divider size="xs" color="mine-shaft.7" />
      )}

      {jobDetails.offered && (
        <div className="flex gap-2">
          <Button color="bright-sun.4 " variant="outline" radius="sm" fullWidth>
            Accept
          </Button>
          <Button color="bright-sun.4 " variant="light" radius="sm" fullWidth>
            Reject
          </Button>
        </div>
      )}

      {jobDetails.interviewing && (
        <div className=" flex gap-1 text-mine-shaft-200 text-sm items-center">
          <IconCalendar stroke={1.5} className="text-bright-sun-400 size-5" />
          Sun, 26 August &bull;{" "}
          <span className="text-mine-shaft-400">10:00 AM</span>
        </div>
      )}

      <Link to={`/jobs/${jobDetails.id}`}>
        <Button fullWidth variant="outline">
          View Job
        </Button>
      </Link>
    </div>
  );
};
export default Card;
