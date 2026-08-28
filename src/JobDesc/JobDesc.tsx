import {
  IconBookmark,
  IconBookmarkFilled,
  IconMapPin,
} from "@tabler/icons-react";
import { Text, Avatar, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { Divider } from "@mantine/core";
import { ActionIcon } from "@mantine/core";
import { card, skills, desc } from "../Data/JobDescData";

import DOMPurify from "dompurify";
import { timeAgo } from "../Servicess/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../Servicess/ProfileService";
import { profileAction } from "../Slices/ProfileSlice";
import { useEffect, useState } from "react";
import { postJob } from "../Servicess/jobService";
import {
  errorNotification,
  successNotification,
} from "../Servicess/NotificationService";

const JobDecs = (props: any) => {
  const data = DOMPurify.sanitize(props.description);
  const profile = useSelector((state: any) => state.profile);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [applied, setApplied] = useState(false);
  const handelSaveJob = () => {
    let savedJobs: any = [...profile.savedJobs];

    if (savedJobs.includes(props.id)) {
      savedJobs = savedJobs.filter((id: any) => id !== props.id);
    } else {
      savedJobs = [...savedJobs, props.id];
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

  useEffect(() => {
    if (
      props.applicants?.filter(
        (applicant: any) => applicant.applicantId == user.id,
      ).length > 0
    ) {
      setApplied(true);
    } else {
      setApplied(false);
    }
  }, [props]);

  const handelClose = () => {
    postJob({ ...props, jobStatus: "CLOSED" })
      .then((res) => {
        successNotification("Success", "Job cloased Successfully");
      })
      .catch((err) =>
        errorNotification("Error", "err.response.data.errorMessage"),
      );
  };

  return (
    <div className="w-2/3 bs-mx:w-full pb-5">
      <div className="flex justify-between flex-wrap">
        <div className="flex gap-2 items-center ">
          <div className="p-3 bg-mine-shaft-600 rounded-xl">
            <img
              className="h-14 xs-mx:h-10"
              src={`/Icons/${props.company}.png`}
              alt={props.company}
            />
          </div>
          <div >
            <div className="font-semibold sm-mx:text-lg">{props.jobTitle}</div>
            <div className="text-lg sm-mx:text-sm text-mine-shaft-400 flex flex-wrap">
              <span> &#x2022; {props.company}</span>{" "}
              <span> &#x2022; {timeAgo(props.postTime)} </span>{" "}
              <span>
                {" "}
                &#x2022; {props.applicants ? props.applicants.length : 0}{" "}
                Applications{" "}
              </span>
            </div>
          </div>
        </div>

        <div className="flex sm:flex-col gap-3 items-center sm-mx:my-3 sm-mx:w-full sm-mx:[&>button]:!w-full">
          {(props.edit || !applied) && (
            <Link
              to={
                props.edit ? `/post-job/${props.id}` : `/apply-job/${props.id}`
              }
               className="sm-mx:!w-full sm-mx:[&>button]:!w-full"
            >
              <Button
                variant="light"
                className="!text-bright-sun-400 "
                color="orange"
              >
                {props.closed ? "Reopen" : props.edit ? "Edit" : "Apply"}
              </Button>
            </Link>
          )}
          {!props.edit && applied && (
            <Button variant="light" color="green" className="!text-green-700">
              Applied
            </Button>
          )}

          {props.edit && !props.closed ? (
            <Button
              variant="outline"
              className="!text-bright-sun-400"
              color="red.5"
              onClick={handelClose}
            >
              Close
            </Button>
          ) : profile.savedJobs?.includes(props.id) ? (
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
      </div>
      <Divider size="xs" my="xl" />

      <div className="flex justify-between flex-wrap">
        {card.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <ActionIcon
              className="!h-12 !w-12 xs-mx:!size-8 !text-bright-sun-400"
              variant="light"
              radius="xl"
              aria-label="Settings"
            >
              <item.icon className="h-4/5 w-4/5" stroke={1.5} />
            </ActionIcon>

            <div className="text-mine-shaft-300 text-sm">{item.name}</div>
            <div className="font-semibold xs-mx:text-sm">
              {props ? props[item.id] : "NA"}{" "}
              {item.id == "packageOffered" && <> LPA </>}
            </div>
          </div>
        ))}
      </div>
      <Divider size="xs" my="xl" />
      <div>
        <div>
          <div className="text-xl font-semibold mb-5">Requered skils</div>
        </div>
        <div className=" flex flex-wrap gap-2">
          {props?.skillsRequired?.map((item: any, index: number) => (
            <ActionIcon
              className="!h-fit !w-fit font-medium xs-mx:!text-xs !text-bright-sun-400"
              variant="light"
              radius="xl"
              p="xs"
              
              aria-label="Settings"
            >
              {item}
            </ActionIcon>
          ))}
        </div>
      </div>

      <Divider size="xs" my="xl" />

      <div
        className="[&_h4]:text-xl [&_h4]:my-5 [&_h4]:font-semibold [&_h4]:text-mine-shaft-200  [&_p]:text-justify  [&_*]:text-mine-shaft-300 
       [&_li]:marker:text-bright-sun-400 [&_li]:mb-1 [&_p]:text-sm [&_li]:text-sm "
        dangerouslySetInnerHTML={{ __html: data }}
      ></div>

      <Divider size="xs" my="xl" />

      <div>
        <div className="text-xl font-semibold mb-5">About Company</div>
        <div className="flex justify-between mb-3 xs-mx:flex-wrap">
          <div className="flex gap-2 items-center">
            <div className="p-3 bg-mine-shaft-600 rounded-xl">
              <img
                className="h-8 "
                src={`/Icons/${props.company}.png`}
                alt={props.company}
              />
            </div>
            <div>
              <div className="font-medium">{props.company}</div>
              <div className=" text-mine-shaft-400">10K+ Employees</div>
            </div>
          </div>

          <Link to={`/company/${props.company}`} className="xs-mx:!w-full xs-mx:[&>button]:w-full">
            <Button
              variant="light"
              className="!text-bright-sun-400 xs-mx:mt-3"
              color="orange"
            >
              Company Page
            </Button>
          </Link>
        </div>
        <div className="text-mine-shaft-300 text-justify xs-mx:text-sm">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, quis
          minima assumenda sunt, doloribus accusantium nobis laudantium modi
          dolore facere veniam, ea ipsam. Rerum cupiditate, inventore fugit
          sapiente suscipit quasi.
        </div>
      </div>
    </div>
  );
};
export default JobDecs;
