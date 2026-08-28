import { similar } from "../Data/Company";
import TalentCard from "../findTalrnt/TalentCard";
import CompanyCart from "./CompanyCart";

const SimilarCompany = () => {
  return (
    <div className="w-1/4 mb-5">
      <div className=" flex text-xl font-semibold mb-5 px-8">
        Similar Company
      </div>
      <div className="flex flex-col flex-wrap gap-5 px-8 ">
        {similar.map(
          (similar, index) =>
             <CompanyCart key = {index} {...similar} />
        )}
      </div>
    </div>
  );
};

export default SimilarCompany;
