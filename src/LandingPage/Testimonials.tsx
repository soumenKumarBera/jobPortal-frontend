import { Avatar } from "@mantine/core";
import { Rating } from "@mantine/core";
import { testimonials } from "../Data/Data";

const Testimonials = () => {
  return (
    <div className="mt-5 pb-5  fl">
      <div className="text-center text-4xl  md-mx:text-base sm-mx:text-sm font-semibold text-mine-shaft-100 pb-3 mt-6">
        What <span className="text-bright-sun-400">Users</span> say about us?
      </div>
      <div className="flex justify-evenly md-mx:flex-wrap px-3 gap-2 mt-7">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className=" flex flex-col gap-2 w-[23%] md-mx:w-[48%] xs-mx:w-full border border-bright-sun-400 rounded-lg p-3  transition duration-300 ease-in-out hover:shadow-[0_0_5px_6px_black] !shadow-bright-sun-300 hover:cursor-pointer  "
          >
            <div className=" flex gap-2 items-center">
              <Avatar className="!h-14 !w-14" src="avatar.png" alt="it's me" />
              <div>
                <div className="text-lg sm-mx:text-base xs-mx:text-sm font-medium text-mine-shaft-100">
                  {testimonial.name}
                </div>
                <Rating defaultValue={testimonial.rating} />
              </div>
            </div>

            <div className="text-mine-shaft-300 mt-2 text-ms ">
              {testimonial.testimonial}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Testimonials;
