import { TextInput, Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const Subscribe = () => {

  const match = useMediaQuery("(max-width: 639px)")
  return (
    <div className="mt-20   flex items-center bg-mine-shaft-900 mx-20 sm-mx:mx-5 py-3   rounded-xl justify-around flex-wrap">
      <div className=" w-2/5 bs-mx:w-4/5 text-center text-4xl bs-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl font-semibold text-mine-shaft-100 pb-3 mt-6">
        Never Wants to Miss <br /> Any{" "}
        <span className="text-bright-sun-400">Job News</span>
      </div>

      <div className = "flex xs-mx:flex-col  bg-mine-shaft-800  rounded-lg  gap-4 xs:items-center  px-3 py-2">
        <TextInput
          className=" [&_input]:text-mine-shaft-200 font-semibold "
          variant="unstyled"
          placeholder="Enter Your Gmail"
          size= {match? "md":"xl"}
        />
        <Button className="" size={match? "sm":"xl"} color="bright-sun.4" variant="filled">Subscribe</Button>
      </div>
    </div>
  );
};
export default Subscribe;
