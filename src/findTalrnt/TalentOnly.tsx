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
import { profile } from "../Data/TalentData";
import { useSelector } from "react-redux";

const TalentOnly = (props: any) => {


  
  return (
    <div className="bg-mine-shaft-700  p-4 w-96 flex  flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !bright-sun-400 cursor-pointer mb-5 bs-mx:w-full">
      <div className="flex justify-between ">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-600 rounded-full">
            <Avatar
              src={
                props.picture
                  ? `data:image/jpeg;base64,${props.picture}`
                  : "/Avatar.png"
              }
              alt="it's me"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-lg">{props.name}</div>
            <div className="text-sm text-mine-shaft-300">
              {props.jobTitle} &#x2022; {props.company}
            </div>
          </div>
        </div>
        <IconHeart stroke={2} className="text-mine-shaft-300 cursor-pointer" />
      </div>
      <div className="flex flex-wrap gap-2 [&>div]:px-2 [&>div]:py-1 [&>div]:bg-mine-shaft-600 [&>div]:rounded-lg [&>div]:text-xs [&>div]:text-bright-sun-400 mt-4">
        {props.skills?.map(
          (skill: any, index: any) =>
            index < 3 && <div key={index}>{skill}</div>,
        )}
      </div>
      <Text lineClamp={3} className="text-xs text-justify text-mine-shaft-300 ">
        {props.about} {/* Text content */}
      </Text>
      <Divider size="xs" color="mine-shaft.7" />
      {props.invited ? (
        <div className=" flex gap-1 text-mine-shaft-200 text-sm items-center">
          <IconCalendar stroke={1.5} /> Interview:{" "}
          {formateInterviewTime(props.interviewTime)}
        </div>
      ) : (
        <div className="flex justify-between text-sm ">
          <div className="font-semibold">Exp: {props.totalExp? props.totalExp : 1} Years</div>
          <div className="flex items-center gap-1 text-mine-shaft-300">
            <IconMapPin className="size-5" stroke={1.5} /> {props.location}
          </div>
        </div>
      )}

      <Divider size="xs" color="mine-shaft.7" />
      <div className="flex [&>*]:w-1/2 [&>*]:p-1">
        {!props.invited && (
          <>
            <Link to={`/talent-profile/${props.id}`}>
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
              
                
             
                <Button
                  color="bright-sun.4 "
                  variant="light"
                  radius="sm"
                  fullWidth
                >
                  Message
                </Button>
            
            </div>
          </>
        )}
        
           
          
        
      </div>
    

  
    </div>
  );
};
export default TalentOnly;
