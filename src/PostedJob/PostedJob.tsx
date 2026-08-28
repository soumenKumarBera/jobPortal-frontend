import { Tabs } from "@mantine/core";
import { activeJobs } from "../Data/PostedJob";
import PostedJobCard from "./PostedJobCard";
import { use, useEffect, useState } from "react";

const PostedJob = (props: any) => {
  const [activeTab, setActiveTab] = useState<string | null>("ACTIVE");

  useEffect(() => {
    setActiveTab(props.job?.jobStatus || "ACTIVE");
    console.log(activeTab);
  }, [props.job]);

  return (
    <div className="w-1/6 mb-5 mt-5">
      <div className="text-2xl font-semibold mb-5 ">Jobs</div>
      <div className="flex text-center">
        <Tabs
          variant="pills"
          radius="sm"
          value={activeTab}
          onChange={setActiveTab}
        >
          <Tabs.List className='[&_button[aria-selected="false"]]:bg-mine-shaft-900'>
            <Tabs.Tab value="ACTIVE">
              Active [
              {
                props.jobList.filter((job: any) => job.jobStatus === "ACTIVE")
                  .length
              }
              ]
            </Tabs.Tab>
            <Tabs.Tab value="DRAFT">
              Drafts [
              {
                props.jobList.filter((job: any) => job.jobStatus === "DRAFT")
                  .length
              }
              ]
            </Tabs.Tab>
             <Tabs.Tab value="CLOSED">
              Closed [
              {
                props.jobList.filter((job: any) => job.jobStatus === "CLOSED")
                  .length
              }
              ]
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="ACTIVE">
            <div className="flex flex-col gap-3 mt-5 ">
              {props.jobList
                .filter((job: any) => job.jobStatus === activeTab)
                .map((item: any, index: number) => (
                  <PostedJobCard key={index} {...item} />
                ))}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="DRAFT">
            <div className="flex flex-col gap-3 mt-5 ">
              {props.jobList
                .filter((job: any) => job.jobStatus === activeTab)
                .map((item: any, index: number) => (
                  <PostedJobCard key={index} {...item} />
                ))}
            </div>
          </Tabs.Panel>
            <Tabs.Panel value="CLOSED">
            <div className="flex flex-col gap-3 mt-5 ">
              {props.jobList
                .filter((job: any) => job.jobStatus === activeTab)
                .map((item: any, index: number) => (
                  <PostedJobCard key={index} {...item} />
                ))}
            </div>
          </Tabs.Panel>
          
        </Tabs>
      </div>
    </div>
  );
};

export default PostedJob;
