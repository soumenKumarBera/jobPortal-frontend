import { talents } from "../Data/TalentData";
import TalentCard from "../findTalrnt/TalentCard";


const CompanyEmployees = () =>{

  return <div className="flex mt-10 flex-wrap gap-5 justify-center">
          {talents.map((talent, index) => (
            <TalentCard key={index} {...talent} />
          ))}
        </div>


}

export default CompanyEmployees;