import { IconCalendar, IconHeart } from "@tabler/icons-react";
import { Text, Avatar, Button } from "@mantine/core";
import { Divider } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";

import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useEffect, useState } from "react";
import { TimeInput } from "@mantine/dates";
import { useRef } from "react";
import { getProfile } from "../Servicess/ProfileService";
import { changeAppStatus } from "../Servicess/jobService";
import {
  errorNotification,
  successNotification,
} from "../Servicess/NotificationService";
import { formateInterviewTime, openBase64PDF } from "../Servicess/Utilities";

const TalentCard = (props: any) => {
  const { id } = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  const [app, { open: openApp, close: closeApp }] = useDisclosure(false);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<any>(null);
  const ref = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState<any>({});

  

  useEffect(() => {
    if (props.applicantId) {
      getProfile(props.applicantId)
        .then((res) => {
          setProfile(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props]);

  const handleOffer = (status: string) => {
    let interview: any = {
      id,
      applicantId: profile?.id,
     
      applicationStatus: status,
    };

    if( status == "INTERVIEWING"){

      interview = {...interview, interviewTime: `${date}T${time}:00` };
    }

    changeAppStatus(interview)
      .then((res) => {
        if (status === "INTERVIEWING"){
           successNotification(
          "Interview Scheduled",
          "Your interview has been scheduled successfully.",
        );

        }else if (status === "OFFERED") {
          successNotification(
            "Offer Accepted",
            "Offer has been sent successfully.",
          );
        }else {
          successNotification(
            "Rejected",
            "Application has been rejected.",
          );
        }
      
        window.location.reload();
       
      })
      .catch((err) => {

        errorNotification("Error", err.response.data.errorMessage);
      });
  };




  return (
    <div className="bg-mine-shaft-700 p-4 w-96 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !bright-sun-400 cursor-pointer mb-5">
      <div className="flex justify-between ">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-600 rounded-full">
            <Avatar
              src={
                profile.picture
                  ? `data:image/jpeg;base64,${profile.picture}`
                  : "/Avatar.png"
              }
              alt="it's me"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-lg">{props.name}</div>
            <div className="text-sm text-mine-shaft-300">
              {profile.jobTitle} &#x2022; {profile.company}
            </div>
          </div>
        </div>
        <IconHeart stroke={2} className="text-mine-shaft-300 cursor-pointer" />
      </div>
      <div className="flex gap-2 [&>div]:px-2 [&>div]:py-1 [&>div]:bg-mine-shaft-600 [&>div]:rounded-lg [&>div]:text-xs [&>div]:text-bright-sun-400 mt-4">
        {profile.skills?.map(
          (skill: any, index: any) =>
            index < 3 && <div key={index}>{skill}</div>,
        )}
      </div>
      <Text lineClamp={3} className="text-xs text-justify text-mine-shaft-300 ">
        {profile.about} {/* Text content */}
      </Text>
      <Divider size="xs" color="mine-shaft.7" />
      {props.invited ? (
        <div className=" flex gap-1 text-mine-shaft-200 text-sm items-center">
          <IconCalendar stroke={1.5} /> Interview:{" "}
          {formateInterviewTime(props.interviewTime)}
        </div>
      ) : (
        <div className="flex justify-between text-sm ">
          <div className="font-semibold">Exp: {profile.totalExp? profile.totalExp : 1} Years</div>
          <div className="flex items-center gap-1 text-mine-shaft-300">
            <IconMapPin className="size-5" stroke={1.5} /> {profile?.location}
          </div>
        </div>
      )}

      <Divider size="xs" color="mine-shaft.7" />
      <div className="flex [&>*]:w-1/2 [&>*]:p-1">
        {!props.invited && (
          <>
            <Link to={`/talent-profile/${profile.id}`}>
              <Button
                color="bright-sun.4 "
                variant="outline"
                radius="sm"
                fullWidth
              >
                Profile
              </Button>
            </Link>
            <div>
              {props.posted ? (
                <Button
                  onClick={open}
                  rightSection={<IconCalendar className="size-5" />}
                  variant="light"
                  radius="sm"
                  fullWidth
                >
                  Schedule
                </Button>
              ) : (
                <Button
                  color="bright-sun.4 "
                  variant="light"
                  radius="sm"
                  fullWidth
                >
                  Message
                </Button>
              )}
            </div>
          </>
        )}
        {props.invited && (
          <>
            <div>
              <Button
                color="bright-sun.4 "
                variant="outline"
                radius="sm"
                fullWidth
                onClick={() => handleOffer("OFFERED")}
              >
                Accept
              </Button>
            </div>
            <div>
              {" "}
              <Button
                variant="light"
                radius="sm"
                fullWidth
                onClick={() => handleOffer("REJECTED")}
              >
                Reject
              </Button>
            </div>
          </>
        )}
      </div>
      {(props.invited || props.posted) && (
        <Button
          variant="filled"
          color="bright-sun.4"
          radius="sm"
          fullWidth
          autoContrast
          onClick={openApp}
        >
          View Application
        </Button>
      )}

      <Modal
        opened={opened}
        onClose={close}
        title="Schedule InterView"
        centered
      >
        {/* Modal content */}
        <div className=" flex flex-col gap-5">
          <DateInput
            value={date}
            onChange={setDate}
            label="Date"
            placeholder="Enter Date"
          />

          <TimeInput
            label="Time"
            ref={ref}
            value={time}
            onChange={(event) => setTime(event.currentTarget.value)}
            onClick={() => ref.current?.showPicker()}
          />

          <Button
            onClick={() => handleOffer("INTERVIEWING")}
            variant="light"
            fullWidth
          >
            Schedule
          </Button>
        </div>
      </Modal>

      <Modal
        opened={app}
        onClose={closeApp}
        title="Application Details"
        centered
      >
        {/* Modal content */}
        <div className=" flex flex-col gap-5">
          <div>
            Email: &emsp;{" "}
            <a
              className="text-bright-sun-400 hover:underline  cursor-pointer text-center"
              href={`mailto:${props.email}`}
            >
              {props.email}
            </a>
          </div>
          <div>
            Website: &emsp;{" "}
            <a
              className="text-bright-sun-400 hover:underline  cursor-pointer text-center"
              href={props.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.website}
            </a>
          </div>

          <div>
            Resume: &emsp;{" "}
            <span
              className="text-bright-sun-400 hover:underline  cursor-pointer text-center"
              onClick={() => openBase64PDF(props.resume)}
            >
              {props.name}
            </span>
          </div>
          <div>
            Cover Letter: &emsp; <div>{props.coverLetter}</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default TalentCard;
