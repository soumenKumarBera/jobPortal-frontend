import { formateDate } from "../Servicess/Utilities";

const CertCard = (props:any) => {
  return (
    <div className="flex justify-between sm-mx:flex-wrap">
      <div className="flex gap-2 items-center">
        <div className="p-2 bg-mine-shaft-600 rounded-md shrink-0">
          <img className="h-7 " src={`/Icons/${props.issuer}.png`} alt="Google" />
        </div>
        <div>
          <div className="font-semibold sm-mx:text-sm ">{props.name}</div>
          <div className="text-sm sm-mx:text-base text-mine-shaft-300">{props.issuer}</div>
        </div>
      </div>

      <div className="flex flex-col text-end sm-mx:flex-row sm-mx:gap-3">
        <div className="text-sm text-mine-shaft-300">{ formateDate(props.issueDate)}</div>
        <div className="text-sm text-mine-shaft-300">Id: {props.certificateId}</div>
      </div>
    </div>
  );
};

export default CertCard;
