import { IconBraces, IconBriefcase, IconMapPin } from "@tabler/icons-react";
import { Avatar, Button } from "@mantine/core";
import { Divider } from "@mantine/core";
import ExpCard from "./ExpTalent";
import CertCard from "./CertCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile } from "../Servicess/ProfileService";
import { useMediaQuery } from "@mantine/hooks";

const Profile = (props: any) => {
  const { id } = useParams();

  const [profile, setProfile] = useState<any>({});

  useEffect(() => {
    window.scrollTo(0, 0);
    getProfile(Number(id))
      .then((res) => {
        setProfile(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const match = useMediaQuery("(max-width: 475px)");

  return (
    <div className="w-2/3 pb-10 lg-mx:w-full">
      <div className="relative">
        <img
          className="rounded-t-xl xl-mx:!h-40 lg-mx:!w-full"
          src="/Profile/banner.jpg"
          alt=""
        />

       
          <Avatar
            className="!w-48 !h-48 md-mx:!w-40 md-mx:!h-40    border-8
                   border-mine-shaft-800
                   rounded-full !absolute !-bottom-1/3 left-3"
            src={
              profile.picture
                ? `data:image/jpeg;base64,${profile.picture}`
                : "/Avatar.png"
            }
            alt=""
          />
      
        {/* <img
          className="  left-3 border-8 border-mine-shaft-800"
          src={profile.picture? `data:image/jpeg;base64,${profile.picture}`: "/Avatar.png" }
          alt=""
       
        /> */}
      </div>
      <div className="px-3 mt-16">
        <div className="text-3xl xs-mx:text-2xl font-semibold flex justify-between ">
          {profile.name}
          <Button color="bright-sun.9" variant="light" radius="sm" size={match? "sm": "md"}>
            Message
          </Button>
        </div>
        <div className="text-xl xs-mx:text-base flex gap-1 items-center ">
          {" "}
          <IconBriefcase className="h-5 w-5 xs-mx:text-base " stroke={1.5} /> {profile.role}
          &bull; {profile.company}
        </div>
        <div className="flex items-center gap-1 text-mine-shaft-300">
          <IconMapPin className="size-5" stroke={1.5} /> {profile.location}
        </div>
        <div className="flex items-center xs-mx:text-base gap-1 text-mine-shaft-300">
          <IconBriefcase className="size-5" stroke={1.5} />
          Experience {profile.totalExp} Years
        </div>
      </div>

      <Divider mx="xs" my="xl" />

      <div className="px-3">
        <div className="text-2xl font-semibold mb-3">About</div>
        <div className="text-sm xs-mx:text-xs text-mine-shaft-300 text-justify">
          {profile.about}
        </div>
      </div>

      <Divider mx="xs" my="xl" />

      <div className="px-3">
        <div className="text-2xl font-semibold mb-3">Skill</div>
        <div className=" flex gap-2 flex-wrap">
          {/* <div className="bg-bright-sun-300 bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1 text-sm font-medium">
            React
          </div> */}
          {profile.skills?.map((skill: any, index: any) => (
            <div
              key={index}
              className="bg-bright-sun-300  bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1 text-sm font-medium"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

      <Divider mx="xs" my="xl" />

      <div className="px-3">
        <div className="text-2xl font-semibold mb-5">Experience</div>

        <div className="flex flex-col gap-8">
          {profile.experiences?.map((exp: any, index: any) => (
            <ExpCard key={index} {...exp} />
          ))}
        </div>
      </div>

      <Divider mx="xs" my="xl" />

      <div className="px-3">
        <div className="text-2xl font-semibold mb-5">Certification</div>

        <div className="flex flex-col gap-8">
          {profile.certifications?.map((cert: any, index: any) => (
            <CertCard key={index} {...cert} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
