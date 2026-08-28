import { useEffect } from "react";
import { talents } from "../Data/TalentData";
import TalentCard from "../findTalrnt/TalentCard";
import TalentOnly from "../findTalrnt/TalentOnly";
import { useParams } from "react-router-dom";

const RecommentTelant = (props: any) =>{

  const {id} = useParams();
  

  return <div>
  <div className = " flex text-xl font-semibold mb-5 px-8">
    Recommended Talent
  </div>
  <div className="flex lg:flex-col flex-wrap gap-5 lg:px-8  lg-mx:justify-center px-3 bs-mx:w-full">
    {
      props.talents?.map((talent: any, index: any) =>  (
      index < 4 && id != talent.id  &&  <TalentOnly key={index} {...talent} />
      ))
    }
  </div>

  </div>


}

export default RecommentTelant;
