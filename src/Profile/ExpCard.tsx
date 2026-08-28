import { Button } from "@mantine/core";
import { useState } from "react";
import ExpInput from "./ExpInput";
import { formateDate } from "../Servicess/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../Servicess/ProfileService";
import { profileAction } from "../Slices/ProfileSlice";
import { successNotification } from "../Servicess/NotificationService";

const ExpCard = (props: any) => {
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state:any) => state.profile);
  const dispatch = useDispatch();


  const handelDelete = () =>{
    let exp = [...profile.experiences];
    console.log(props.index);
    exp.splice(props.index, 1); //this index,  delete count means kato gula delete korbo

     const update = { ...profile, experiences: exp };

    updateProfile(update)
      .then((res) => {
        dispatch(profileAction.changeProfile(res));
        successNotification("Sucess", "Experiences Deleted Successfully");
      })
      .catch((error) => {
        console.log(error);
      });

  }




  return !edit ? (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between  gap-2 flex-wrap">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-600 rounded-md shrink-0">
            <img
              className="h-7 "
              src={`/Icons/${props.company}.png`}
              alt="Google"
            />
          </div>
          <div>
            <div className="font-semibold">{props.title}</div>
            <div className="text-sm text-mine-shaft-300">
              {props.company} &#x2022; {props.location}
            </div>
          </div>
        </div>

        <div className="text-sm text-mine-shaft-300">
          { formateDate(props.startDate) } - { props.working? "Present":formateDate(props.endDate)}
        </div>
      </div>

      <div className="text-sm xs-mx:text-xs text-mine-shaft-300 text-justify">
        {props.description}
      </div>

      {props.edit && (
        <div className="flex gap-5 ">
          <Button variant="outline" onClick={() => setEdit(true)}>
            Edit
          </Button>
          <Button color="red.8" variant="light" onClick={handelDelete}>
            Dielete
          </Button>
        </div>
      )}
    </div>
  ) : (
    <ExpInput {...props} setEdit ={setEdit}/>
  );
};

export default ExpCard;
