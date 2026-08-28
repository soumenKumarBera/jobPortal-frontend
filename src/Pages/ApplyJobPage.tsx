import { Link, useNavigate, useParams } from "react-router-dom";
import { Text, Avatar, Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import ApplyJobCom from "../ApplyJob/ApplyJobComp";
import { useEffect, useState } from "react";
import { getAllJobs, getJob } from "../Servicess/jobService";
const ApplyJobPage = () => {
  const navugate = useNavigate();

  const [job, setJob] = useState<any>(null);

  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);

    getJob(id)
      .then((res) => {
        setJob(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <div className="min-h-[100vh] bg-mine-shaft-800 font-['Poppins'] px-4">
      <div className="my-4 inline-block">
        <Button
        mb= "xs"
          variant="light"
          leftSection={<IconArrowLeft />}
          className="!text-bright-sun-300 "
          color="orange"
          onClick={() => navugate(-1)}
        >
          Back
        </Button>
      </div>
      <ApplyJobCom {...job} />
    </div>
  );
};
export default ApplyJobPage;
