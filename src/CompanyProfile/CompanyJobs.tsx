import { jobList } from "../Data/JobsData"
import JobCart from "../Findjobs/JobCart"

const CompanyJobs = () =>{
  return   <div className="mt-10 gap-8 flex flex-wrap justify-center">
        {jobList.map((job, index) => (
          <JobCart key={index} {...job} />
        ))}
      </div>
}

export default CompanyJobs;