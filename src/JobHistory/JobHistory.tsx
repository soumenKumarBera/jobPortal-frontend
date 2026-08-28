import { Tabs } from "@mantine/core";
import { jobList } from "../Data/JobsData";
import Card from "./Card";
import { useEffect, useState } from "react";
import { getAllJobs } from "../Servicess/jobService";
import { useSelector } from "react-redux";

const JobHistory = () => {
  const [activeTab, setActiveTap] = useState<any>("APPLIED");
  const [jobList, setJobList] = useState<any>([]);

  const [shoeList, setShowList] = useState<any>([]);

  const user = useSelector((state: any) => state.user);

  const profile = useSelector((state: any) => state.profile);

  useEffect(() => {
    getAllJobs()
      .then((res) => {
        setJobList(res);

        setShowList(
          res.filter((job: any) => {
            let found = false;
            job.applicants?.forEach((applicant: any) => {
              if (
                applicant.applicantId == user.id &&
                applicant.applicationStatus == "APPLIED"
              ) {
                found = true;
              }
            });

            return found;
          }),
        );
      })
      .catch((err) => console.log(err));
  }, []);

  const handelTapChange = (value: any) => {
    setActiveTap(value);

    if (value == "SAVED") {
      setShowList(
        jobList.filter((job: any) => profile.savedJobs.includes(job.id)),
      );
    } else {
      setShowList(
        jobList.filter((job: any) => {
          let found = false;
          job.applicants?.forEach((applicant: any) => {
            if (
              applicant.applicantId == user.id &&
              applicant.applicationStatus == value
            ) {
              found = true;
            }
          });

          return found;
        }),
      );
    }
  };

  return (
    <div className=" mt-5 mb-5">
      <div className="text-2xl sm-mx:text-xl font-semibold mb-5 ">Job History</div>
      <div>
        <Tabs
          value={activeTab}
          onChange={handelTapChange}
          variant="outline"
          radius="lg"
          defaultValue="gallery"
        >
          <Tabs.List className="[&_button]:text-xl font-semibold [&_button[data-active='true']]:text-bright-sun-400
           sm-mx:[&_button]:!text-lg  xs-mx:[&_button]:!text-base xsm-mx:[&_button]:!text-sm xs-mx:[&_button]:!px-1.5 xs-mx:[&_button]:!py-1.5 xs-mx:font-medium">
            <Tabs.Tab value="APPLIED">Applied</Tabs.Tab>
            <Tabs.Tab value="SAVED">Saved</Tabs.Tab>
            <Tabs.Tab value="OFFERED">Offered</Tabs.Tab>
            <Tabs.Tab value="INTERVIEWING">In Progress</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value={activeTab}>
            <div className="mt-10 gap-8 flex flex-wrap justify-center">
              {shoeList.map((job: any, index: any) => (
                <Card
                  key={index}
                  {...job}
                  {...{ [activeTab.toLowerCase()]: true }}
                />
              ))}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="Saved">
            <div className="mt-10 gap-8 flex flex-wrap justify-center">
              {shoeList.map((job: any, index: any) => (
                <Card key={index} {...job} saved />
              ))}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="Offered">
            <div className="mt-10 gap-8 flex flex-wrap justify-center">
              {jobList.map((job: any, index: any) => (
                <Card key={index} {...job} offered />
              ))}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="Interviewing">
            <div className="mt-10 gap-8 flex flex-wrap justify-center">
              {jobList.map((job: any, index: any) => (
                <Card key={index} {...job} interviewing />
              ))}
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default JobHistory;
