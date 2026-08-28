import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { formateDate } from "../Servicess/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../Servicess/ProfileService";
import { profileAction } from "../Slices/ProfileSlice";
import { successNotification } from "../Servicess/NotificationService";
import { useMediaQuery } from "@mantine/hooks";

const CertCard = (props: any) => {

  const profile = useSelector((state:any) => state.profile);
  const dispatch = useDispatch();

  const handelDelete =() =>{

    let cert = [...profile.certifications];

    cert.splice(props.index, 1);

     const update = { ...profile, certifications: cert };
       
        updateProfile(update)
          .then((res) => {
            dispatch(profileAction.changeProfile(res));
            successNotification("Sucess", `Delete Successfully`);
          })
          .catch((error) => {
            console.log(error);
          });



  }
  
  
  const match = useMediaQuery("(max-width: 475px)");


  return (
    <div className="flex justify-between sm-mx:flex-wrap">
      <div className="flex gap-2 items-center ">
        <div className="p-2 bg-mine-shaft-600 rounded-md shrink-0">
          <img
            className="h-7 "
            src={`/Icons/${props.issuer}.png`}
            alt="Google"
          />
        </div>
        <div>
          <div className="font-semibold xs-mx:text-sm">{props.name}</div>
          <div className="text-sm text-mine-shaft-300 xs-mx:text-xs">{props.issuer}</div>
        </div>
      </div>
      <div className=" flex items-center gap-2">
        <div className="flex flex-col text-end sm-mx:flex-row sm-mx:gap-3">
          <div className="text-sm text-mine-shaft-300 xs-mx:text-xs">{formateDate(props.issueDate)}</div>
          <div className="text-sm text-mine-shaft-300 xs-mx:text-xs">
            Id: {props.certificateId}
          </div>
        </div>

        {props.edit && (
          <ActionIcon aria-label="Settings" color="red.8" variant="subtle" size={match ? "md" : "lg"} onClick={handelDelete}>
            <IconTrash className="h-4/5 w-4/5 " stroke={1.5} />
          </ActionIcon>
        )}
      </div>
    </div>
  );
};

export default CertCard;
