import { Divider } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { Text, Avatar, Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Profile from "../TalentProfile/Profile";
import { profile } from "../Data/TalentData";
import RecommentTelant from "../TalentProfile/Recomment";
import JobDecs from "../JobDesc/JobDesc";
import RecommendedJob from "../JobDesc/RecommendedJob";
import { useEffect, useState } from "react";
import { getJob } from "../Servicess/jobService";

const JobdescPage = () => {
 
  const {id} = useParams(); //ata router url thake id nebar jonno

  const [job, setJob] = useState<any>(null);

  useEffect(() =>{
   window.scrollTo(0,0);

      getJob(id).then(res => {
          setJob(res);

      }).catch(err => {
        console.log(err);
      })

  }, [id]);

  return (
    <div className="min-h-[100vh] bg-mine-shaft-800 font-['Poppins'] px-4">
      <Link className="my-4 inline-block" to="/find-jobs">
        <Button
          variant="light"
          leftSection={<IconArrowLeft />}
          className="!text-bright-sun-300"
          color="orange"
        >
          Back
        </Button>
      </Link>
      {/* <Divider size="xs" /> */}
      <div className="flex gap-5 pb-5 justify-around bs-mx:flex-wrap">

        <JobDecs {...job}/>
        <RecommendedJob/>
       
      </div>
    </div>
  );
};

export default JobdescPage;
