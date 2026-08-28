import { Divider } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { Text, Avatar, Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Profile from "../TalentProfile/Profile";
import { profile } from "../Data/TalentData";
import RecommentTelant from "../TalentProfile/Recomment";
import { useEffect, useState } from "react";
import { getProfileAll } from "../Servicess/ProfileService";

const TalentPrifilePage = () => {
const navigate = useNavigate();

const [talentProfile, setTalentProfile] = useState<any[]>([]);
          useEffect(() => {
            getProfileAll().then((res) => {
              
              setTalentProfile(res);
            }).catch((err) => {
              console.log(err);
            })
          }, [])

  return (
    <div className="min-h-[100vh] bg-mine-shaft-800 font-['Poppins'] px-4">
      <div className="my-4 inline-block" onClick={() => navigate(-1)}  >
        <Button
          variant="light"
          leftSection={<IconArrowLeft />}
          className="!text-bright-sun-300"
          color="orange"
        >
          Back
        </Button>
      </div>
      {/* <Divider size="xs" /> */}
      <div className="flex lg-mx:flex-wrap justify-center">
        <Profile  />
        <RecommentTelant talents={talentProfile} />
      </div>
    </div>
  );
};

export default TalentPrifilePage;
