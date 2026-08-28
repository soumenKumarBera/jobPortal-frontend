import { ActionIcon } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";



const CompanyCart = (jobDetails:any) => {

return  <div className="flex justify-between p-2 rounded-lg bg-mine-shaft-900 items-center">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-600 rounded-md">
            <img className="h-7 " src={`/Icons/${jobDetails.name}.png`} alt={jobDetails.company} />
          </div>
          <div>
            <div className="font-semibold">{jobDetails.name}</div>
            <div className="text-xs text-mine-shaft-300">
              {jobDetails.employees}
            </div>
          </div>
        </div>

          <ActionIcon color="bright-sun.4" variant="transparent" aria-label="settings">

            <IconExternalLink  stroke={1.5}/>
          </ActionIcon>

      </div>

}

export default CompanyCart;