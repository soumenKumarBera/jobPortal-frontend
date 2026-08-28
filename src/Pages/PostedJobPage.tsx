import { useNavigate, useParams } from "react-router-dom";
import PostedJob from "../PostedJob/PostedJob";
import PostedJobDes from "../PostedJob/PostedJobdes";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getJobPostedBy } from "../Servicess/jobService";
import { Button, Divider, Drawer } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const PostedJobPage = () => {
    const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector((state: any) => state.user);

  const [jobList, setJobList] = useState<any[]>([]);
  const [job, setJob] = useState<any>({});
const matchs = useMediaQuery("(max-width: 900px)")
  useEffect(() => {
    window.scrollTo(0, 0);
    
    getJobPostedBy(user.id)
      .then((res) => {
        setJobList(res);
        if(res && res.length > 0 && Number(id) == 0){
          navigate(`/posted-job/${res[0].id}`);
        }

        const selectedJob = res.find((item: any) => item.id === Number(id));

        setJob(selectedJob);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // useEffect(() => {
  //   console.log(job);
  // }, [job]);



  return (
    <div className="min-h-[100vh]  bg-mine-shaft-800 font-['Poppins'] px-4">
     {matchs && <Button variant="light"  my="xs" autoContrast onClick={open}>
        All Jobs
      </Button> }
      <Drawer opened={opened} size="300" onClose={close} title="All Jobs"   overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}>
        {/* Drawer content */}
         <PostedJob job={job} jobList={jobList} />
      </Drawer>
      <Divider size="xs" />
      <div className="flex gap-5 justify-around py-5">
      {!matchs &&  <PostedJob job={job} jobList={jobList} />}
        <PostedJobDes {...job} />
      </div>
    </div>
  );
};

export default PostedJobPage;
