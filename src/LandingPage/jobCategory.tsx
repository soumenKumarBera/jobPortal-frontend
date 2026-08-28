import { Carousel } from "@mantine/carousel";
import { jobCategory } from "../Data/Data";

import { ArrowRightIcon, ArrowLeftIcon } from "@phosphor-icons/react";

const JobCategory = () => {
  return (
    <div mt-20 pb-10>
      <div className="text-center text-4xl font-semibold text-mine-shaft-100 pb-3 mt-6 bs-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl">
        Browse <span className="text-bright-sun-400">Job</span> Categories
      </div>
      <div className=" text-lg sm-mx:text-base xs-mx:text-sm mb-10 mx-auto text-mine-shaft-300 text-center sm-mx:w-11/12">
        Explore diverse job opportunities tailored to your skills. Start your{" "}
        <br /> career journey today!
      </div>
      <Carousel
        slideSize="22%"
        slideGap="md"
        className="[&_button]:!bg-bright-sun-400 [&_button]:!border-none [&_button]:hover:opacity-75 [&_button]:opacity-0 hover:[&_button]:opacity-100 " 
        nextControlIcon={<ArrowRightIcon className="h-8 w-8" />}
        previousControlIcon={<ArrowLeftIcon className="h-8 w-8" />}
        emblaOptions={{
          loop: true,
          dragFree: false,
          align: "center",
        }}
      >
        {jobCategory.map((category, index) => (
          <Carousel.Slide key={index}>
            <div className="flex flex-col items-center  w-64  gap-2 border border-bright-sun-400 rounded-lg p-4  hover:shadow-lg my-5 transition duration-300 ease-in-out hover:shadow-[0_0_5px_6px_black] !shadow-bright-sun-300 hover:cursor-pointer  ">
              <div className="p-2 bg-bright-sun-300 rounded-full">
                {" "}
                <img
                  className="size-8"
                  src={`/Category/${category.name}.png`}
                  alt=""
                />
              </div>
              <div className="text-mine-shaft-200 text-lg font-semibold">
                {category.name}
              </div>
              <div className="text-mine-shaft-300 text-sm  text-center">
                {category.desc}
              </div>
              <div className="text-bright-sun-300 text-lg">
                {category.jobs}+ new job posted
              </div>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default JobCategory;
