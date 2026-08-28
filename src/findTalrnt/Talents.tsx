import Sort from "../Findjobs/Sort";
import { talents } from "../Data/TalentData";
import TalentCard from "./TalentCard";
import { useEffect, useState } from "react";
import { getProfileAll } from "../Servicess/ProfileService";
import TalentOnly from "./TalentOnly";
import { useDispatch, useSelector } from "react-redux";
import { filterAction } from "../Slices/FilterSlice";
import { sortAction } from "../Slices/sortSlice";

const Talents = () => {
  const [talents, setTalentas] = useState<any>([]);
 const dispatch = useDispatch();
  const filter = useSelector((state: any) => state.filter);
    const stateSort = useSelector((state: any) => state.sort);
  const [filteredTalentas, setFilteredTalents] = useState<any>([]);

  useEffect(() => {
    dispatch(filterAction.resetFilter())
     dispatch(sortAction.resetSort());
    getProfileAll()
      .then((res) => {
        setTalentas(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() =>{

   if(stateSort === "Experience (Low to High)"){
       setTalentas([...talents].sort((a:any, b:any) => a.totalExp - b.totalExp)) // min to max

    }else if(stateSort === "Experience (High to Low)"){
       setTalentas([...talents].sort((a:any, b:any) => b.totalExp - a.totalExp)) //max to min 

    }


  }, [stateSort]);


  useEffect(() => {
    let filterTalent = talents;
   

    if (filter.name) {
      filterTalent = filterTalent.filter((talent: any) =>
        (talent.name ?? "")
          .toLowerCase()
          .includes((filter.name ?? "").toLowerCase()),
      );
    }
    if (filter["Job Title"] && filter["Job Title"].length > 0) {
      filterTalent = filterTalent.filter((role: any) =>
        (filter["Job Title"] ?? []).some(
          (title: any) =>
            (role.jobTitle ?? "").toLowerCase().includes(
            String(title ?? "").toLowerCase()),
        ),
      );
    }

    if (filter["Location"]?.length > 0) {
  filterTalent = filterTalent.filter((role: any) =>
    filter["Location"].some((location: any) =>
      (role.location ?? "")
        .toLowerCase()
        .includes(String(location ?? "").toLowerCase())
    )
  );
}

if (filter["Skills"]?.length > 0) {
  filterTalent = filterTalent.filter((role: any) =>
    filter["Skills"].some((skill: any) =>
      (role.skills ?? []).some(
        (roleSkill: any) =>
          String(roleSkill ?? "").toLowerCase() ===
          String(skill ?? "").toLowerCase()
      )
    )
  );
}

if (filter.exp?.length === 2) {
  filterTalent = filterTalent.filter((talent: any) => {
    const experience = Number(talent.totalExp ?? 0);

    return experience >= filter.exp[0] &&
           experience <= filter.exp[1];
  });
}

    setFilteredTalents(filterTalent);
   
  }, [filter, talents]);

  return (
    <div className="p-5 py-7">
      <div className="flex justify-between ">
        <div className="text-2xl text-mine-shaft-200">Talents</div>

        <Sort />
      </div>

      <div className="flex mt-10 flex-wrap gap-5 justify-center">
        {filteredTalentas.length? filteredTalentas.map((talent: any, index: any) => (
          <TalentOnly key={index} {...talent} />
        )) : <div className="text-2xl font-semibold"> No Talents found</div>}
      </div>
    </div>
  );
};
export default Talents;
