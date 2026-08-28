import { IconBraces, IconBriefcase, IconMapPin } from "@tabler/icons-react";
import { Button } from "@mantine/core";
import { Divider } from "@mantine/core";
import { Avatar } from "@mantine/core";
import { useState } from "react";
import { Tabs } from "@mantine/core";
import AboutComp from "./AboutComp";
import CompanyJobs from "./CompanyJobs";
import CompanyEmployees from "./CompanyEmploy";

const Company = () => {
  return (
    <div className="w-3/4 mb-5">
      <div className="relative">
        <img className="rounded-t-xl" src="/Profile/banner.jpg" alt="" />
        <img
          className="rounded-3xl   bg-mine-shaft-800 w-30 h-30 absolute -bottom-1/3 left-5 p-2"
          src="/Icons/Google.png"
          alt=""
        />
      </div>
      <div className="px-3 mt-20">
        <div className="text-3xl font-semibold flex justify-between ">
          Google
          <Avatar.Group>
            <Avatar src="avatar.png" />
            <Avatar src="avatar1.png" />
            <Avatar src="avatar2.png" />
            <Avatar>10K</Avatar>
          </Avatar.Group>
        </div>

        <div className="flex items-center gap-1 text-mine-shaft-300">
          <IconMapPin className="size-5" stroke={1.5} /> west bengoli
        </div>
      </div>

      <Divider mx="xs" my="xl" />

      <Tabs variant="outline" radius="lg" defaultValue="gallery">
        <Tabs.List className="[&_button]:text-lg font-semibold [&_button[data-active='true']]:text-bright-sun-400">
          <Tabs.Tab value="about">About</Tabs.Tab>
          <Tabs.Tab value="jobes">Jobes</Tabs.Tab>
          <Tabs.Tab value="employers">Employers</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="about"><AboutComp /></Tabs.Panel>
        <Tabs.Panel value="jobes"><CompanyJobs /></Tabs.Panel>
        <Tabs.Panel value="employers"><CompanyEmployees /></Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default Company;
