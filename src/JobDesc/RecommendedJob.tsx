import { useParams } from "react-router-dom";
import { jobList } from "../Data/JobsData";
import JobCart from "../Findjobs/JobCart";
import { useEffect, useState } from "react";
import { getAllJobs } from "../Servicess/jobService";

const RecommendedJob = () => {
  const { id } = useParams();

  const [jobList, setJobList] = useState<any>(null);

  useEffect(() => {
    getAllJobs()
      .then((res) => {
        setJobList(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className=" flex text-xl font-semibold mb-5 px-8 bs-mx:px-2 ">
        Recommended Job
      </div>
      <div className="flex bs:flex-col bs-mx:justify-center md-mx:w-full flex-wrap gap-5 px-8 ">
        {jobList?.map(
          (job: any, index: any) =>
            index < 5 && id != job.id && <JobCart key={index} {...job} />,
        )}
      </div>
    </div>
  );
};
export default RecommendedJob;
